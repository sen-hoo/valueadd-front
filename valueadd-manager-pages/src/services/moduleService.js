import getRequestPromise from '../utils/getRequestPromise';

const requestUrl = {
    queryModule: '/module/query',//搜索模块
    addModule: '/module/add',//增加模块
    editModule: '/module/edit',//编辑模块
    deleteModule: '/module/delete',//删除模块
    getModule: '/module/get'//通过主键id查询单个module
}


export default {
    queryModuleList(p) {
        var params = {
            username: p.username,
            token: p.token,
            pageNumber: p.pageNumber,
            pageSize: p.pageSize,
            param: {}//页面搜索条件
        };

        for (var key in p.param) {
            if (p.param[key] != "") {
                params.param[key] = p.param[key];
            }
        }

        var options = {
            url: requestUrl.queryModule,
            data: {
                ...params
            }
        }

        return getRequestPromise(options);

    },

    addModule(p) {
        var newVersionTip = '为了您更好的体验，请更新新版本!';
        var newModule = {
            username: p.username,
            token: p.token,
            moduleName:p.moduleName,
            fid:p.tagString,
            href:p.touristAllow
            
        };
    }
}