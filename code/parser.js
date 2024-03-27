function scheduleHtmlParser(html) {
	let result = [];
	$(`tr>td:nth-child(11)`).map((index, element) => {
		let data = $(element).text();
		data = data.trim().replace(/\s{2,}/g, " ");
		let splitStrArr = splitStr(data);
		splitStrArr.map((el, i) => {
			let obj = {};
			//课程名称
			let className = $(`tbody>tr:nth-child(${index + 2})>td:nth-child(5)`).text();
			obj.name = className;
			//老师名字
			let tacherName = $(`tbody>tr:nth-child(${index + 2})>td:nth-child(8)`).text();
			obj.teacher = tacherName;

			let allArr = el.split(" ");
			allArr.map((el2, i2) => {
				if (i2 === 0) {//周数
					let weekNum = [];
					el2.split(",").map((el3, i3) => {
						let startWeek = el3.split("-")[0];
						let endWeek = removeNonDigits(el3.split("-")[1]);
						weekNum = weekNum.concat(getNumbersBetween(startWeek,endWeek))
					});
					obj.weeks = weekNum
				}else if(i2 === 1){//星期几
					obj.day = charToNum(el2.slice(2))
				}else if(i2 === 2){//节次
					let startSections = el2.split("-")[0];
					let endSections = removeNonDigits(el2.split("-")[1]);
					obj.sections = getNumbersBetween(startSections,endSections);
				}else if(i2 === 3){//上课地点
					obj.position = el2
				}
			});
			result.push(obj)
		});
	});
	function splitStr(str) {
		let part = str.split(" ");
		let count = 3,
			tempStr = "",
			tempStrArr = [];
		part.map((el, i) => {
			if (i === count) {
				tempStr += el + " ";
				tempStrArr.push(tempStr);
				tempStr = "";
				count += 4;
			} else {
				tempStr += el + " ";
			}
		});
		return tempStrArr;
	}

	function removeNonDigits(s) {
		return s.replace(/\D/g, "");
	}

	function getNumbersBetween(num1, num2) {
		var start = Math.min(num1, num2);
		var end = Math.max(num1, num2);
		var result = [];
		for (var i = start; i <= end; i++) {
			result.push(i);
		}
		return result;
	}

	function charToNum(s){
		let arr = ["一","二","三","四","五","六","七"]
		return arr.findIndex((element)=>element === s)+1
	}

	return result;
}
