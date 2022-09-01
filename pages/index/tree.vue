<template>
	<view>
		<view v-show="choose==0">
			<view  class="title" @click="add">许愿</view>
			<image class="tree" src="../../static/tree.png" mode=""></image>
			<image class="like" @click="wishDetail(item)" v-for="(item,index) in List" :src="item.gender==2?girlImg:boyImg" 
			 :style="{'top':wishlocal[index][0]+'vh','left':wishlocal[index][1]+'vw','transform':'rotate('+wishlocal[index][2]+')deg'}"></image>
		</view>
		
		<view v-show="choose==1">
			<view v-for="(item,index) in List2" :key="index" class="card"  :class="{girl:item.gender==2}">
				<image src="../../static/许愿池.png" mode=""></image>
				<view class="text">{{item.name}}的心愿:{{item.title}}</view>
				<view class="text">{{item.desc}}</view>
				<view class="text">{{item.time}}</view>
			</view>
		</view>
		
		<view class="tabBar">
		    <view class="tabBar-item">
		        <view @click="addWish">
		            <image class="tabBar-icon" src="../../static/许愿池.png" v-if="choose==1"></image>
		            <image class="tabBar-icon" src="../../static/许愿池1.png" v-if="choose==0"></image>
		        </view>
		        <view @click="addWish" class="">许愿</view>
		    </view>
		    <view class="tabBar-item">
		        <view @click="completeWish">
		            <image class="tabBar-icon" src="../../static/心愿.png" v-if="choose==0"></image>
		            <image class="tabBar-icon" src="../../static/心愿1.png" v-if="choose==1"></image>
		        </view>
		        <view @click="completeWish" class="">已实现</view>
		    </view>
		</view>
	
	<view class="form">
		<uni-popup ref="popup"  background-color="#fff" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm">
				<uni-forms  >
				    <uni-forms-item label="愿望标题" name="name">
				        <uni-easyinput type="text" v-model="formData.title" placeholder="请输入标题" />
				    </uni-forms-item>
				    <uni-forms-item  name="hobby" label="愿望内容">
				         <uni-easyinput type="textarea"  autoHeight  v-model="formData.desc"  />
				    </uni-forms-item>
				</uni-forms>
			</uni-popup-dialog>
		       
		       
		</uni-popup>
	</view>
	
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				boyImg:'../../static/心愿单1.png',
				girlImg:'../../static/心愿单.png',
				choose:0,
				formData:{
					title:'',
					desc:''
				},
				List:[],
				List2:[],
				imgList:['../../static/心愿单.png',],
				wishlocal:[[ 15, 40, 0 ], [ 23, 25, 7 ], [ 24, 39, 7 ], [ 25, 53, 7 ], [ 32, 20, 7 ], [ 33, 32, 7 ], [ 34, 45, 7 ], [ 35, 59, 7 ], [ 45, 20, -7 ], [ 44, 34, -7 ], [ 43, 48, -7 ], [ 41.5, 63, -7 ], [ 52, 16, 7 ], [ 53, 30, 7 ], [ 54, 45, 7 ], [ 55, 59, 7 ], [ 55, 72, 7 ], [ 66, 10, -7 ], [ 65, 24, -7 ], [ 64, 40, -7 ], [ 63, 56, -7 ], [ 62, 70, -7 ], [ 73, 2, 0 ], [ 73, 15, 0 ], [ 73, 27, 0 ], [ 73, 39, 0 ], [ 73, 52, 0 ], [ 73, 65, 0 ], [ 73, 78, 0 ] ],
			}
		},
		onLoad() {
			
			this.getData(0)
		},
		methods: {
			wishDetail(val){
				var that = this;
				uni.showModal({
				    title: val.title,
				    content: val.desc,
					confirmText:'已实现',
				    success: function (res) {
				        if (res.confirm) {
				           that.updateWish(val)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			updateWish(val){
				//修改为已完成
				uniCloud.callFunction({
						name: 'wish',
						data: {
							type:'update',
							_id:val._id,
							status:1
						}
					})
					.then(res => {
						// this.List = res.result.data;
					});
			},
			getData(val){
				uniCloud.callFunction({
						name: 'wish',
						data: {
							type:'get',
							status:val
						}
					})
					.then(res => {
						if(val==1){
							this.List2 = res.result.data;
						}else{
							this.List = res.result.data;
						}
						
					});
			},
			addWish(){
				this.choose = 0;
				this.getData(0)
			},
			completeWish(){
				this.choose = 1;
				this.getData(1)
			},
			add(){
				this.$refs.popup.open('center')
			},
			confirm(){
				if (!this.formData.title)
					return uni.showToast({
						icon: 'error',
						title: '请输入标题',
						duration: 2000
					});
				if (!this.formData.desc)
						return uni.showToast({
							icon: 'error',
							title: '请输入内容',
							duration: 2000
						});
				uni.showLoading()
				var that = this;
				if (!uni.getStorageSync('userinfo')) {
					uni.getUserProfile({
						desc: '用于显示用户头像昵称',
						success(val) {
							uni.setStorage({
								key: 'userinfo',
								data: val.rawData,
							})
							var data = JSON.parse(val.rawData)
							
							that.saveUser(data)
						},
						fail(val) {
							
							uni.hideLoading();
						}
					})
				}else{
						that.submitWish()
				}
			},
			submitWish(){
				var that = this;
				uniCloud.callFunction({
						name: 'wish',
						data: {
							type:'add',
							openid: uni.getStorageSync('openid'),
							title:this.formData.title,
							desc:this.formData.desc,
							time:this.getTime(),
							status:0
						}
					})
					.then(res => {
						uni.hideLoading();
						that.$refs.popup.close();
						that.formData = {title:'',desc:''}
						uni.showToast({
							title: '添加成功',
							duration: 2000
						});
						that.getData(0)
					});
			},
			close(){
				
				this.$refs.popup.close()
				this.formData = {title:'',desc:''}
				
			},
			getTime() {
			
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			saveUser(data) {
				var that = this;
				uniCloud.callFunction({
						name: 'user',
						data: {
							openid: uni.getStorageSync('openid'),
							name: data.nickName,
							avatarUrl: data.avatarUrl,
							gender:data.gender
						}
					})
					.then(res => {
						that.submitWish()
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.girl{
		background-color: pink !important;
	}
	.title{
		position: absolute;
		left: 34%;
		padding: 40rpx;
		top: 36rpx;
		color: #FFFFFF;
		font-size: 36rpx;
	}
	.tree{
		height: 1050rpx;
		width: 750rpx;
	}
	.tabBar {
	    width: 100%;
	    display: flex;
	    position: fixed;
	    bottom: 0;
	    padding: 10rpx;
	    margin-left: -4rpx;
	    background: pink;
	    font-size: 24rpx;
	    color: #8A8A8A;
	    box-shadow: 3rpx 3rpx 3rpx 3rpx #aaa;
	    z-index: 9999;
		
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	
	.tabBar-item {
	    float: left;
	    width: 100%;
	    text-align: center;
	    overflow: hidden;
	}
	.tabBar-icon {
	    width: 54rpx;
	    height: 54rpx;
	}
	.like {
	    width: 80rpx;
		height: 80rpx;
	    position: absolute;
	}
	.form{
		width: 300rpx;
		height: 400rpx;
	}
	.card{
		width: 85%;
		// height: 200rpx;
		padding: 40rpx 25rpx 45rpx 25rpx;
		background-color: #87CEEB;
		color: #FFFFFF;
		margin: 30rpx auto;
		border-radius: 15rpx;
		 box-shadow: 5rpx 5rpx 5rpx 5rpx #E0E3DA;
		.text{
			margin-bottom: 20rpx;
		}
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}
</style>
