<div class="market-detail-page">
<template v-if="!$loadingAsyncData">
	<common-header></common-header>
	<div class="cover-wrapper">
		<!-- <div class="like-wrapper" @click="like">
			<img v-if="liked" src="/static/img/like.png" alt="Like" class="like">
			<img v-else src="/static/img/like-default.png" alt="Like" class="like">
			<span>{{detail.like}}</span>
		</div> -->
		<imageslider
			:images="detail.images"
			:is-ready="true"
		>
		</imageslider>
	</div>
	<div class="poetry">
		<p v-for="item in detail.poetry">{{item}}</p>
	</div>
	<div class="sale-spacing"></div>
	<div class="sale-wrapper com-border-top">
		<div class="row">
			<div class="price">￥{{detail.price}}</div>
			<div v-if="detail.reserve" class="-col-auto">
				<div class="row ft12" @click="buy">
					<div class="com-btn mr10">购买</div>
					<div class="-col-auto fcweak">库存: {{detail.reserve}}件</div>
				</div>
			</div>
			<div v-else class="-col-auto fcweak">已售空</div>
		</div>
	</div>
</template>
</div>