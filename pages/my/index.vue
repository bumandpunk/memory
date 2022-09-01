<template>
	<view class="">
		<view class="user">
			<image class="head" :src="user.avatarUrl" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{}
			}
		},
		onLoad() {
			var that =  this;
			uni.getStorage({
				key:'userinfo',
				success(val){
					console.log(val)
					that.user = JSON.parse(val.data) 
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.user{
		width: 220rpx;
		margin: 30rpx auto;
		.head{
			width: 220rpx;
			height: 220rpx;
			border-radius: 50%;
			
		}
	}
</style>
