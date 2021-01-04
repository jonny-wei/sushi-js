/**
 * 模拟 AJAX
 *
 */
const getJSON = function (url) {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) {
                return;
            }
            if(xhr.status === 200 || xhr.status === 304){
                resolve(xhr.responseText)
            }else{
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send()
    })
};
