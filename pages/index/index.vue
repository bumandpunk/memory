<template>
	<view >
		<uni-notice-bar :scrollable="true" single="true" :showIcon="true" :text="text" speed="70"></uni-notice-bar>
		<view class="container">
		<uni-grid :column="3" @change="goUrl()" >
		   <uni-grid-item v-for="(item,index) in List" :key="index" :index="index" class="card">
		        
				<image class="img" :src="item.img" mode=""></image>
		    </uni-grid-item>
		</uni-grid>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:'今夕何夕兮，搴舟中流。今日何日兮，得与王子同舟。蒙羞被好兮，不訾诟耻。心几烦而不绝兮，得知王子。山有木兮木有枝，心悦君兮君不知。',
				List:[
					{
						text:'备忘录',
						img:'../../static/留言.png',
						url:'/pages/index/message'
					},
					{
						text:'许愿树',
						url:'/pages/index/tree',
						img:'../../static/许愿树1.png'
					},
					{
						text:'抽奖',
						url:'/pages/index/roll',
						img:'../../static/roll.png'
					},
					
				]
			}
		},
		onLoad() {
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
				uniCloud.callFunction({
						name: 'openid',
						data: {
							code: loginRes.code,
						}
					})
					.then(res => {
						
						uni.setStorage({
						    key: 'openid',
						    data: res.result,
						    success: function () {
						        console.log('success');
						    }
						});
					});
			  }
			});
		},
		methods: {
		    goUrl(val){
				
				uni.navigateTo({
				    url: this.List[val.detail.index].url
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 15px;
		font-size: 14px;
		line-height: 24px;
		
	}
	.card{
		.img{
			width:90%;
			height: 90%;
		    margin: 10rpx auto;
		}
	}
	.text{
		text-align: center;
		
	}
</style>
