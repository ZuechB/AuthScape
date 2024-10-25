import React, { Component } from 'react';
//import {apiService} from 'authscape';
import DataTable, {createTheme} from "react-data-table-component";

export class Datatable extends Component {

    static defaultProps = {
        options: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            pageNumber : 1,
            pageLength : props.pageLength ? props.pageLength : 10,
            data: [],
            loading: false,
            totalRows: 0
        };
    }

    componentDidMount = async () => {
        await this.GetDataFromUrl(this.state.pageNumber, this.state.pageLength, this.props.params);
        createTheme('dataTable', {
            text:{

            }
        })
    }

    reload = async (reset = false) => {
      
        if (reset === true)
        {
            this.setState({pageNumber: 1}, async () => {
                await this.GetDataFromUrl(this.state.pageNumber, this.state.pageLength, this.props.params);
            })
        }
        else
        {
            await this.GetDataFromUrl(this.state.pageNumber, this.state.pageLength, this.props.params);
        }

       
    }

    GetDataFromUrl = (page, length, postData = {}) => {

        this.setState({
            loading: true
        }, async function () {

            let data = postData;

            data.offset = page;
            data.length = length;

            let response = null;
            if (this.props.methodType == "get")
            {
                response = await apiService().get(this.props.url);
            }
            else
            {
                response = await apiService().post(this.props.url, postData);
            }
            
            if (response != null && response.status === 200)
            {
                if (this.props.returnResult != null)
                {
                    this.props.returnResult(response.data.data);
                }

                this.setState({
                    totalRows: response.data.recordsTotal,
                    data: response.data.data,
                    loading: false
                });
            }
            else
            {
                //console.error(response.status + " - " + response.data);
            }

        });
        
    }

    handlePageChange = async page => {
        const { pageLength } = this.state;
        this.setState({pageNumber: page});
        await this.GetDataFromUrl(page, pageLength, this.props.params);
    };

    render() {

        return (
        <div>
                <DataTable
                    title={this.props.title}
                    columns={this.props.columns}
                    data={this.state.data}
                    paginationRowsPerPageOptions={this.props.pageLength ? [this.props.pageLength] : [10]}
                    progressPending={this.state.loading}
                    //customStyles={this.props.customStyles}
                    paginationPerPage={this.props.pageLength ? this.props.pageLength : 10}
                    paginationServer
                    pagination
                    {...this.props.options}
                    //expandableRows={this.props.expandableRows}
                    //expandableRowsComponent={this.props.expandableRowsComponent}
                    paginationTotalRows={this.state.totalRows}
                    // onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                    noDataComponent={this.props.noDataComponent}
                />
        </div>);
    }
}