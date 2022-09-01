<template>
	<view>
		<view class="message_list">
			<!-- <unicloud-db ref="list" v-slot:default="{data, loading, error, options}" collection="message">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="option" v-for="(item,index) in data" :key="index"
						@click="onClick(item._id)">
						<uni-list-chat :title="item.name" :avatar="item.avatarUrl" :note="item.text" :time="item.time">
						</uni-list-chat>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</unicloud-db> -->
			<uni-list>
				<uni-swipe-action>
			  <uni-swipe-action-item :right-options="option" v-for="(item,index) in List" :key="index"  @click="onClick(item._id)" >
				 <uni-list-chat  :title="item.name" :avatar="item.avatarUrl" :note="item.text" :time="item.time" >
				 </uni-list-chat>
			  </uni-swipe-action-item>
			  </uni-swipe-action>
			</uni-list>
		</view>
		<view class="send">
			<input type="text" v-model="text" placeholder="请输入...." />
			<button class="button_send" size="mini" @click="send">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
				List: [],
				option: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			onClick(val) {
				uni.showLoading()
					
				
				uniCloud.callFunction({
						name: 'message',
						data: {
							type: 'del',
							id: val
						}
					})
					.then(res => {
						uni.hideLoading()
						uni.showToast({
							title: '删除成功',
							duration: 2000
						});
						this.getData()
					});
				// this.$refs.list.remove(val, {confirmTitle:'是否要删除',confirmContent:'删除后无法恢复',success:(res) =>{
				// 	console.log(res)
				// }})
			},
			getData() {
				uni.showLoading({
					title:'加载中'
				})
				uniCloud.callFunction({
						name: 'message',
						data: {
							type: 'get',
						}
					})
					.then(res => {
						console.log(res,'wiowiwowwo')
						console.log(this.List)
						this.List = res.result.data
						uni.hideLoading()
					});
			},
			send() {
				if (!this.text)
					return uni.showToast({
						icon: 'error',
						title: '请输入内容',
						duration: 2000
					});
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
							uni.showLoading()
							that.saveUser(data)
						},
						fail(val) {
							console.log(val)
						}
					})
				} else {
					uni.showLoading()
					that.sendMessage()
				}

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
						that.sendMessage()
					});
			},
			sendMessage() {
				uniCloud.callFunction({
						name: 'message',
						data: {
							type: 'add',
							text: this.text,
							openid: uni.getStorageSync('openid'),
							time: this.getTime()
						}
					})
					.then(res => {
						console.log(res)
						   uni.hideLoading()
							uni.showToast({
								title: '添加成功',
								duration: 2000
							});
							this.text = '';

							// this.$refs.list.refresh()
							this.getData()
							

					});
				// var value = {
				// 	text: this.text,
				// 	openid: uni.getStorageSync('openid'),
				// 	time: this.getTime()
				// }
				// this.$refs.list.add(value, {
				// 	toastTitle: '新增成功',
				// 	success: (res) => { // 新增成功后的回调
				// 		console.log(res)
						
				// 	},
				// })
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
			}
		}
	}
</script>

<style lang="scss">
	.message_list {
		padding-bottom: 80rpx;
	}
	.button_send{
		background-color: #007AFF;
		color:#FFFFFF;
	}
	.send {
		position: fixed;
		bottom: 0;
		width: 100%;
		// height: 90rpx;
		background-color: #F0F0F0;
		display: flex;
		justify-content: space-around;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		input {
			width: 75%;
			height: 90rpx;
			line-height: 90rpx;
			padding-left: 25rpx;
		}

		button {
			height: 70rpx;
			line-height: 70rpx;
			margin-top: 10rpx;
		}
	}
</style>
