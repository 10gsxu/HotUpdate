export default class HttpUtil {
    private static instance: HttpUtil = null;
    public static get Instance(): HttpUtil {
        if(this.instance == null)
            this.instance = new HttpUtil();
        return this.instance;
    }

    public request(param: {url:string, method:string, success:Function, fail:Function}) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            /*
            cc.log(xhr.readyState);
            0：初始化，XMLHttpRequest对象还没有完成初始化
            1：载入，XMLHttpRequest对象开始发送请求
            2：载入完成，XMLHttpRequest对象的请求发送完成
            3：解析，XMLHttpRequest对象开始读取服务器的响应
            4：完成，XMLHttpRequest对象读取服务器响应结束
            */
            if (xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 400) {
                    if (typeof param.success == 'function') {
                        param.success(xhr.responseText);
                    }
                } else {
                    if (typeof param.fail == 'function') {
                        param.fail("error");
                    }
                }
            } else {
                //不做任何处理
            }
        };
        //超时时间，单位是毫秒
        xhr.timeout = 3000;
        xhr.ontimeout = function() {
            xhr.abort();
        }
        xhr.open(param.method.toUpperCase(), param.url, true);
        xhr.send();
    }
}