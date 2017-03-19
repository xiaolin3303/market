<div class="market-main-page styleguide">
	<common-header></common-header>
	<div class="cover-wrapper">
		<imageslider
			:images="bannerImages"
			:is-ready="true"
		>
		</imageslider>
	</div>
	<a href="#cat?type={{item.key}}" class="cat-item row" v-for="item in catList">
		<img v-bind:src="item.icon" width="40" class="-col-auto mr10" alt="">
		<div>
			<p>{{item.title}}</p>
			<p class="ft12 fcweak mt5">{{item.subtitle}}</p>
		</div>
	</a>
	<div class="cat-item row">
		<img src="/static/img/more.png" width="40" class="-col-auto mr10" alt="">
		<div>
			<p>其他系列</p>
			<p class="ft12 fcweak mt5">敬请期待</p>
		</div>
	</div>
	<common-footer></common-footer>
</div>
