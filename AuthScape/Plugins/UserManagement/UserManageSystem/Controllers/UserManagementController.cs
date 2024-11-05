using AuthScape.UserManagementSystem.Models;
using AuthScape.UserManageSystem.Models;
using AuthScape.UserManageSystem.Services;
using CoreBackpack.Pagination;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Azure;
using Newtonsoft.Json;
using OpenIddict.Validation.AspNetCore;
using System.Dynamic;
using System.Globalization;
using System.Security.Claims;
using System.Text;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace AuthScape.UserManageSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public class UserManagementController : ControllerBase
    {
        readonly IUserManagementSystemService userManagementSystemService;
        public UserManagementController(IUserManagementSystemService userManagementSystemService) 
        {
            this.userManagementSystemService = userManagementSystemService;
        }

        [HttpPost]
        public async Task<IActionResult> GetUsers(GetUsersParam param)
        {
            var users = await userManagementSystemService.GetUsers(param.offset, param.length, param.searchByName, param.searchByCompanyId, param.searchByRoleId);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = users.total,
                recordsFiltered = users.total,
                data = users.ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> GetCompanies(GetUsersParam param)
        {
            var users = await userManagementSystemService.GetCompanies(param.offset, param.length, param.searchByName);

            return Ok(new ReactDataTable()
            {
                draw = 0,
                recordsTotal = users.total,
                recordsFiltered = users.total,
                data = users.ToList()
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            return Ok(await userManagementSystemService.GetAllRoles());
        }

        [HttpPost]
        public async Task<IActionResult> AddRole(AddRoleParam param)
        {
            await userManagementSystemService.AddRole(param.Role);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AssignUserToRole(AssignUserToRoleParam param)
        {
            await userManagementSystemService.AssignUserToRole(param.RoleId, param.UserId);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveUserFromRole(AssignUserToRoleParam param)
        {
            await userManagementSystemService.RemoveUserFromRole(param.RoleId, param.UserId);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPermissions()
        {
            return Ok(await userManagementSystemService.GetPermissions());
        }

        [HttpPost]
        public async Task<IActionResult> AddPermission(AddPermissionParam param)
        {
            await userManagementSystemService.AddPermission(param.Name);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(long userId)
        {
            return Ok(await userManagementSystemService.GetUser(userId));
        }

        [HttpGet]
        public async Task<IActionResult> GetCompany(long companyId)
        {
            return Ok(await userManagementSystemService.GetCompany(companyId));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserEditResult user)
        {
            await userManagementSystemService.UpdateUser(user);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UploadUsers(UploadUsersParam param)
        {
            var accountsNotUploaded = new List<UserManagementUploadField>();

            var uploadFields = new List<UserManagementUploadField>();

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                MissingFieldFound = null
            };


            using (var reader = new StreamReader(param.File.OpenReadStream()))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var record = new UserManagementUploadField
                    {
                        FirstName = csv.GetField<string>("FirstName"),
                        LastName = csv.GetField<string>("LastName"),
                        Email = csv.GetField<string>("Email")
                    };
                    record.Properties = new Dictionary<string, string>();

                    var password = csv.GetField<string?>("Password");
                    if (!String.IsNullOrWhiteSpace(password))
                    {
                        record.Password = password;
                    }

                    var companyId = csv.GetField<string?>("CompanyId");
                    if (!String.IsNullOrWhiteSpace(companyId))
                    {
                        record.CompanyId = companyId;
                    }

                    var locationId = csv.GetField<string?>("LocationId");
                    if (!String.IsNullOrWhiteSpace(locationId))
                    {
                        record.LocationId = locationId;
                    }


                    // add your roles comma seperated
                    var roles = csv.GetField<string?>("Roles");
                    if (!String.IsNullOrWhiteSpace(roles))
                    {
                        record.Roles = roles;
                    }

                    var permissions = csv.GetField<string?>("Permissions");
                    if (!String.IsNullOrWhiteSpace(permissions))
                    {
                        record.Permissions = permissions;
                    }

                    // add the properties
                    var headerProperties = csv.HeaderRecord
                        .Where(h => h != "FirstName" && h != "LastName" && h != "Email" && h != "Password" && h != "CompanyId" && h != "LocationId" && h!= "Roles" && h!= "Permissions").ToList();

                    foreach (var headerProperty in headerProperties)
                    {
                        try
                        {
                            record.Properties.Add(headerProperty, csv.GetField<string>(headerProperty));
                        }
                        catch(Exception) { }
                    }

                    uploadFields.Add(record);
                }
            }

            foreach (var uploadField in uploadFields)
            {
                var isSuccessful = await userManagementSystemService.AddUser(
                    uploadField.FirstName,
                    uploadField.LastName,
                    uploadField.Email,
                    uploadField.Password,
                    !String.IsNullOrWhiteSpace(uploadField.CompanyId) ? Convert.ToInt64(uploadField.CompanyId) : null,
                    !String.IsNullOrWhiteSpace(uploadField.LocationId) ? Convert.ToInt64(uploadField.LocationId) : null,
                    uploadField.Roles,
                    uploadField.Permissions,
                    uploadField.Properties
                );

                if (!isSuccessful)
                {
                    uploadField.Password = "";
                    accountsNotUploaded.Add(uploadField);
                }
            }



            return Ok(accountsNotUploaded);
        }

        [HttpGet]
        public async Task<IActionResult> GetDownloadTemplate(string customFields)
        {
            var permissions = await userManagementSystemService.GetPermissions();

            var arrayCustomFields = JsonConvert.DeserializeObject<List<CustomField>>(customFields);


            var csv = new StringBuilder();
            csv.Append("FirstName,LastName,Email,Password,CompanyId,Roles,Permissions");

            if (arrayCustomFields != null && arrayCustomFields.Count() > 0)
            {
                var nameArray = arrayCustomFields.Select(p => p.Name).ToList();

                if (nameArray.Count() > 0)
                {
                    csv.Append(",");
                }

                csv.Append(String.Join(",", nameArray));

                byte[] byteArray = Encoding.UTF8.GetBytes(csv.ToString());

                var memoryStream = new MemoryStream(byteArray);

                memoryStream.Seek(0, SeekOrigin.Begin);

                return File(memoryStream, "text/csv");
            }

            return BadRequest();
        }


        [HttpGet]
        public async Task<IActionResult> GetCompanies(string? name = null)
        {
            return Ok(await userManagementSystemService.GetCompanies(name));
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations(long companyId, string? name = null)
        {
            return Ok(await userManagementSystemService.GetLocations(companyId, name));
        }

        [HttpPut]
        public async Task<IActionResult> ChangeUserPassword(ChangeUserPasswordParam param)
        {
            var response = await userManagementSystemService.ChangeUserPassword(param.UserId, param.Password);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomFields(CustomFieldPlatformType platformType)
        {
            var customFields = await userManagementSystemService.GetAllCustomFields(platformType);
            return Ok(customFields);
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomTabs(CustomFieldPlatformType platformType)
        {
            return Ok(await userManagementSystemService.GetCustomTabs(platformType));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTab(CreateTabParam param)
        {
            var tabId = await userManagementSystemService.CreateTab(param.Name, param.PlatformType);
            return Ok(tabId);
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomField(Guid id)
        {
            return Ok(await userManagementSystemService.GetCustomField(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateCustomField(CustomFieldParam customField)
        {
            await userManagementSystemService.AddUpdateCustomField(customField);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateCompany(CompanyEditParam param)
        {
            await userManagementSystemService.UpdateCompany(param);
            return Ok();
        }
    }

    public class CreateTabParam
    {
        public string Name { get; set; }
        public CustomFieldPlatformType PlatformType { get; set; }
    }

    public class ChangeUserPasswordParam
    {
        public long UserId { get; set; }
        public string Password { get; set; }
    }

    public class GetUsersParam
    {
        public int offset { get; set; }
        public int length { get; set; }
        public string? searchByName { get; set; }

        public long? searchByCompanyId { get; set; }
        public long? searchByRoleId { get; set; }
    }

    public class UserManagementUploadField
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; } = null;
        public string? CompanyId { get; set; } = null;
        public string? LocationId { get; set; } = null;

        public string? Roles { get; set; }
        public string? Permissions { get; set; }

        public Dictionary<string, string>? Properties { get; set; }
    }

    public class UserManagementUploadFieldProperty
    {
        public string Header { get; set; }
        public string? Value { get; set; }
    }


    public class UploadUsersParam
    {
        public IFormFile File { get; set; }
    }

    public class AddPermissionParam
    {
        public string Name { get; set; }
    }

    public class AssignUserToRoleParam
    {
        public long UserId { get; set; }
        public long RoleId { get; set; }
    }

    public class AddRoleParam
    {
        public string Role { get; set; }
    }
}
