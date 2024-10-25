import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
// import ManageMappingDocuments from './manageMappingDocuments';
// import AssignMapping from './AssignMapping';

export function FileMapping({currentUser, fileUploadName = "Upload Document", hideDocumentManager = false, setIsLoading = null, documentTypeId = null, onOpened = null, onPublished = null, onCanceled = null, onArchived = null}) {

    const [documentComponentId, setDocumentComponentId] = useState(null);

    useEffect(() => {

      if (documentComponentId != null)
      {
        if (onOpened != null)
        {
          onOpened(documentComponentId);
        }
      }

    }, [documentComponentId]);

    return (
        <Box>
            {documentComponentId == null &&
              <ManageMappingDocuments
                fileUploadName={fileUploadName}
                documentTypeId={documentTypeId}
                hideDocumentManager={hideDocumentManager}
                companyId={currentUser != null ? currentUser.companyId : null} 
                onManageField={(documentComponentId) => {

                  setDocumentComponentId(documentComponentId);

                }}
                onArchive={(documentComponentId) => {

                  //alert(documentComponentId);
                  if (onArchived != null)
                  {
                    onArchived(documentComponentId);
                  }

                }}
              />
            }

            {documentComponentId != null &&
              <AssignMapping currentUser={currentUser} setIsLoading={setIsLoading} documentComponentId={documentComponentId}
                onCancel={() => {

                  setDocumentComponentId(null);
                  
                  if (onCanceled != null)
                  {
                    onCanceled(documentComponentId);
                  }

                }} 
                onPublished={() => {
                  setDocumentComponentId(null);
                  
                  if (onPublished != null)
                  {
                    onPublished(documentComponentId);
                  }
                }} />
            }


        </Box>
    )
}
