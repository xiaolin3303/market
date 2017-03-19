<div class="market-cat-page styleguide">
<template v-if="!$loadingAsyncData">	
	<common-header></common-header>
	<div class="cat-desc row com-border-top">
		<p>名著系列</p>
		<p class="ft12 fcweak -col-auto">-- 每一个故事都从一段历史开始</p>
	</div>

	<a v-for="item in list" href="#detail?id={{item._id}}" class="detail mt10 row">
		<img v-bind:src="item.image" alt="" width="100%">
	</a>
</template>
</div>
