/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({ providerRes, parserRes } = {}) {
	// 支持异步操作 推荐await写法

	function convertDateToTimestamp(dateString) {
		var date = new Date(dateString);
		var timestamp = date.getTime();
		return timestamp;
	}
  console.log("parserRes:",parserRes,providerRes)

	// 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

	// 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
	return {
		totalWeek: 20, // 总周数：[1, 30]之间的整数
		startSemester: convertDateToTimestamp("2024-2-26").toString(), // 开学时间：时间戳，13位长度字符串，推荐用代码生成
		startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
		showWeekend: true, // 是否显示周末
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
	};
}
