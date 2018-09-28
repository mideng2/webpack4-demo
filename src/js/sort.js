

var str = '472897421347873';
sortNum(str);
function sortNum(str) {
    //数字归类
    var temp = {};
    var arr = str.split('');
    for(var i = 0;i<arr.length;i++){
        if(temp[arr[i]]){
            temp[arr[i]]++;
        }else{
            temp[arr[i]] = 1;
        }
    }

    //按数字出现次数排序
    var numArr = [];
    for(item in temp){
        var strs = '';
        for(var j = 0;j<temp[item];j++){
            strs = strs +item
        }
        numArr.push(strs)
    }

    numArr.sort(function (a,b) {
        if(a.length === b.length){
            return b-a;
        }else{
            return b.length - a.length;
        }
    });

    console.log(numArr);

}