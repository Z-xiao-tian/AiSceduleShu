function scheduleHtmlParser(html) {
    let result = [],maxWeek = 0

    /**
     * 将杂乱的课程信息分割为数组，数组包含课程的周数，星期几，节次，上课地点
     * @param {String} str 课程的一些信息
     * @returns {Array}
     * @example
     * let str = "1-5,7-16周 星期四 6-7节 L507计算机教室(成都) 1-16周 星期五 1-2节 L505计算机教室(成都)"
     * let result = splitStr(str)
     * console.log(result)
     * //result = [
     * //           '1-5,7-16周 星期四 6-7节 L507计算机教室(成都) ',
     * //           '1-16周 星期五 1-2节 L505计算机教室(成都) '
     * //           ]
     */
    function splitStr(str) {
        let part = str.split(" ")
        let count = 3,
            tempStr = "",
            tempStrArr = []
        part.map((el, i) => {
            if (i === count) {
                tempStr += el + " "
                tempStrArr.push(tempStr)
                tempStr = ""
                count += 4
            } else {
                tempStr += el + " "
            }
        })
        return tempStrArr
    }

    /**
     * 去掉非数字的字符串
     * @param {String} s 要去除的字符串
     * @returns {string}
     */
    function removeNonDigits(s) {
        return s.replace(/\D/g, "")
    }

    /**
     * 返回两个数字之间的所有数字，左开右开区间
     * @param {number} num1 数字一
     * @param {number} num2 数字二
     * @returns {Array} 两个数字之间数字的集合
     */
    function getNumbersBetween(num1, num2) {
        var start = Math.min(num1, num2)
        var end = Math.max(num1, num2)
        var result = []
        for (var i = start; i <= end; i++) {
            result.push(i)
        }
        return result
    }

    /**
     * 将一到七的个位字符串转为数字
     * @param {string} s 一到七的字符串
     * @returns {number}
     */
    function charToNum(s) {
        let arr = ["一", "二", "三", "四", "五", "六", "七"]
        const reg = /^[一二三四五六七]$/
        const isThis = reg.test(s)
        if (isThis) {
            return arr.findIndex((element) => element === s) + 1
        }
        return Error("请输入一到七的整数汉字")
    }
    /**
     * 找到一个数组中最大的数
     * @param {Array<number>} arr 查找的数组
     * @return {number}
     */
    function findArrMax(arr){
        let max = arr[0]
        arr.forEach((e,i)=>{
            if(max < e){
                max = e
            }
        })
        return max
    }

    $(`tr>td:nth-child(11)`).map((index, element) => {
        let data = $(element).text()
        //正则匹配将多个空格替换为单个空格
        data = data.trim().replace(/\s{2,}/g, " ")
        let splitStrArr = splitStr(data)
        splitStrArr.map((el, i) => {
            //单个课程
            let obj = {}
            //课程名称
            let className = $(`tbody>tr:nth-child(${index + 2})>td:nth-child(5)`).text()
            obj.name = className
            //老师名字
            let tacherName = $(`tbody>tr:nth-child(${index + 2})>td:nth-child(8)`).text()
            obj.teacher = tacherName

            let allArr = el.split(" ")
            allArr.map((el2, i2) => {
                if (i2 === 0) {
                    let weekNum = []
                    el2.split(",").map((el3, i3) => {
                        let startWeek = el3.split("-")[0]
                        let endWeek = removeNonDigits(el3.split("-")[1])
                        weekNum = weekNum.concat(getNumbersBetween(startWeek, endWeek))
                    })
                    //周数
                    obj.weeks = weekNum
                    let maxNum = findArrMax(weekNum)
                    if(maxWeek < maxNum){
                        maxWeek = maxNum
                    }
                } else if (i2 === 1) {
                    //星期几
                    obj.day = charToNum(el2.slice(2))
                } else if (i2 === 2) {
                    let startSections = el2.split("-")[0]
                    let endSections = removeNonDigits(el2.split("-")[1])
                    //节次
                    obj.sections = getNumbersBetween(startSections, endSections)
                } else if (i2 === 3) {
                    //上课地点
                    obj.position = el2
                }
            })
            result.push(obj)
        })
    })
    return {
        courseInfos:result,
        something:{
            maxWeek
        }
    }
}
