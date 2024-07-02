function scheduleHtmlParser(html) {
    let classInfoArrayResult = []

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

    function handleWeeksAndSectionsString(str) {
        let result = []
        arr = str.replace(/周/, "").replace(/节/, "").split(",")
        arr.forEach((el, i) => {
            el = el.split("-")
            if (el.length === 1) {
                result.push(el[0])
            } else {
                result = result.concat(getNumbersBetween(el[0], el[1]))
            }
        })
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

    function handleDayString(str) {
        result = charToNum(str[2])
        return result
    }

    function arrayToObject(arr) {
        let weeksReg = /[0-9]周|([0-9][0-9])周/
        let isWeeks = (value) => weeksReg.test(value)
        let dayReg = /星期(一|二|三|四|五|六|日)/
        let isDay = (value) => dayReg.test(value)
        let sectionsReg = /[0-9]节|([0-9][0-9])节/
        let isSections = (value) => sectionsReg.test(value)

        let obj = {}
        arr.forEach((el, i) => {
            if (isWeeks(el)) {
                obj.weeks = handleWeeksAndSectionsString(el)
            } else if (isDay(el)) {
                obj.day = handleDayString(el)
            } else if (isSections(el)) {
                obj.sections = handleWeeksAndSectionsString(el)
            } else {
                obj.position = el
            }
        })
        return obj
    }

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
    /**
     *
     * @param {String} str
     */
    function splitStr(str) {
        let result = []
        let arr = []
        str.split(" ").forEach((el, i) => {
            arr.push(el)
            if (arr.length === 4) {
                result.push(arrayToObject(arr))
                arr = []
            }
        })
        return result
    }

    $(`tr>td:nth-child(11)`).map((index, element) => {
        let data = $(element).text()
        //正则匹配将多个空格替换为单个空格
        data = data.trim().replace(/\s{2,}/g, " ")
        //忽略在线课程
        if (!/在线课程/.test(data)) {
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
                obj.sections = el.sections
                obj.position = el.position
                obj.weeks = el.weeks
                obj.day = el.day
                
                classInfoArrayResult.push(obj)
            })
        }
    })
    return classInfoArrayResult
}
