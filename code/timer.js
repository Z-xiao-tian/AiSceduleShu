/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({ providerRes, parserRes } = {}) {
    let maxWeek = parserRes.something.maxWeek
    // 支持异步操作 推荐await写法
    await loadTool("AIScheduleTools")

    //是否显示周末，由用户选择
    const isShowWeekend = await AIScheduleConfirm({
        titleText: "是否显示周末", // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        contentText: "若周末有课程，请打开此选项", // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
        cancelText: "否", // 取消按钮文字，可不传默认为取消
        confirmText: "是", // 确认按钮文字，可不传默认为确认
    })
    //开学时间
    const schoolStartTime = await AISchedulePrompt({
        titleText: "开学时间", // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: "请输入你开始上课的时间", // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: "格式:年-月-日", // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: (value) => {
            // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
            const reg = /^\d{4}-\d{1,2}-\d{1,2}$/
            let formatIsTrue = reg.test(value)
            if (formatIsTrue === false) return "输入的时间格式不正确，请输入“年-月-日”这样的格式"
            return false
        },
    })

    /**
     *
     * @param {String} dateString - 转为时间戳的时间字符串
     * @returns {String} - 返回转为时间戳的字符串
     */
    function convertDateToTimestamp(dateString) {
        var date = new Date(dateString)
        var timestamp = date.getTime()
        return timestamp.toString()
    }

    // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
        totalWeek: maxWeek, // 总周数：[1, 30]之间的整数
        startSemester: convertDateToTimestamp(schoolStartTime), // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: isShowWeekend, // 是否显示周末
        forenoon: 5, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [
            {
                section: 1, // 节次：[1, 30]之间的整数
                startTime: "08:20", // 开始时间：参照这个标准格式5位长度字符串
                endTime: "09:05", // 结束时间：同上
            },
            {
                section: 2,
                startTime: "09:10",
                endTime: "09:55",
            },
            {
                section: 3,
                startTime: "10:10",
                endTime: "10:55",
            },
            {
                section: 4,
                startTime: "11:00",
                endTime: "11:45",
            },
            {
                section: 5,
                startTime: "11:50",
                endTime: "12:35",
            },
            {
                section: 6,
                startTime: "14:20",
                endTime: "15:05",
            },
            {
                section: 7,
                startTime: "15:10",
                endTime: "15:55",
            },
            {
                section: 8,
                startTime: "16:10",
                endTime: "16:55",
            },
            {
                section: 9,
                startTime: "17:00",
                endTime: "17:45",
            },
            {
                section: 10,
                startTime: "19:00",
                endTime: "19:45",
            },
            {
                section: 11,
                startTime: "19:50",
                endTime: "20:35",
            },
        ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
}
