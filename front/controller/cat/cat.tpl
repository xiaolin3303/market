<div class="market-cat-page styleguide">
<template v-if="!$loadingAsyncData">	
	<common-header></common-header>
	<div class="cat-desc block rt com-border-top">
		<p>{{catDetail.title}}</p>
		<p class="ft12 fcweak -col-auto">-- {{catDetail.subtitle}}</p>
	</div>

	<a v-for="item in list" href="#detail?id={{item._id}}" class="detail mt10 block rt">
		<img v-bind:src="item.image" class="block" alt="" width="100%">
		<p class="title">{{item.title}}</p>
	</a>
</template>
</div>
