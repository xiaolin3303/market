const COLLECTION_IMAGE_PRIFIX = 'http://139.129.230.76:8000/images/market-images/';
// const API_HOST = 'http://127.0.0.1:8001/api/';
const API_HOST = 'http://139.129.230.76/api/';

const COLLECTION_DETAIL = (id) => `${API_HOST}detail/${id}`;
const COLLECTION_LIST = (cat) => `${API_HOST}list/${cat}`;

const CAT = {
	four: {
		title: '中国四大名著系列',
		subtitle: '一个故事从一段历史开始',
		icon: __uri('/static/img/book.png')
	},
	flower: {
		title: '花镜系列',
		subtitle: '承载的是万物，也可以是花香',
		icon: __uri('/static/img/flower.png')
	},
	changshana: {
		title: '常莎娜系列',
		subtitle: '一花一佛',
		icon: __uri('/static/img/buddha.png')
	},
	free: {
		title: '逍遥游系列',
		subtitle: '北冥有鱼',
		icon: __uri('/static/img/competition.png')
	}
}