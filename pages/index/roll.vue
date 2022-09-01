<template>
	 <view>
	    <LuckyWheel
		  class="roll"
	      ref="luckyWheel"
	      width="600rpx"
	      height="600rpx"
	      :blocks="blocks"
	      :prizes="prizes"
	      :buttons="buttons"
	      :defaultStyle="defaultStyle"
	      @start="startCallBack"
	      @end="endCallBack"
	    />
		
	  </view>
</template>

<script>
	import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel' // 大转盘
	import LuckyGrid from '@/components/@lucky-canvas/uni/lucky-grid' // 九宫格
	export default {
		data() {
			return {
				 blocks: [
				          { padding: '13px', background: '#765AF0' }
				        ],
				        prizes: [
							 { title: '屎', background: '#B183DF', fonts: [{ text: '屎', top: '18%' }] },
				          { title: '黄焖鸡', background: '#f9e3bb', fonts: [{ text: '黄焖鸡', top: '18%' }] },
				          { title: '卤肉饭', background: '#B183DF', fonts: [{ text: '卤肉饭', top: '18%' }] },
				          { title: '炸鸡', background: '#f9e3bb', fonts: [{ text: '炸鸡', top: '18%' }] },
				          { title: '水饺', background: '#B183DF', fonts: [{ text: '水饺', top: '18%' }] },
				          { title: '盖浇饭', background: '#f9e3bb', fonts: [{ text: '盖浇饭', top: '18%' }] },
				          { title: '奶茶小食', background: '#B183DF', fonts: [{ text: '奶茶小食', top: '18%' }] },
						   { title: '热干面', background: '#f9e3bb', fonts: [{ text: '热干面', top: '18%' }] },
						    { title: '烧烤炸串', background: '#B183DF', fonts: [{ text: '烧烤炸串', top: '18%' }] },
							{ title: '麻辣香锅', background: '#f9e3bb', fonts: [{ text: '麻辣香锅', top: '18%' }] },
							 { title: '凉皮肉夹馍', background: '#B183DF', fonts: [{ text: '凉皮肉夹馍', top: '18%' }] },
							  { title: '土', background: '#f9e3bb', fonts: [{ text: '土', top: '18%' }] },
							   { title: '汉堡包', background: '#B183DF', fonts: [{ text: '汉堡包', top: '18%' }] },
							    { title: '兰州拉面', background: '#f9e3bb', fonts: [{ text: '兰州拉面', top: '18%' }] },
								{ title: '丸子汤', background: '#B183DF', fonts: [{ text: '丸子汤', top: '18%' }] },
								 { title: '椒麻鸡', background: '#f9e3bb', fonts: [{ text: '椒麻鸡', top: '18%' }] },
				        ],
				        buttons: [
				          { radius: '50px', background: '#FFC0CB' },
				          { radius: '45px', background: '#fff' },
				          { radius: '41px', background: '#f6c66f', pointer: true },
				          {
				            radius: '35px', background: '#ffdea0',
				            fonts: [{ text: '开始\n干饭', fontSize: '18px', top: -18 }]
				          }
				        ],
				        defaultStyle: {
				          fontColor: '#F5F5F5',
				          fontSize: '14px',
						  
				        },
						defaultConfig:{
							stopRange: 0.5
						}
			}
		},
		components:{LuckyWheel,LuckyGrid},
		methods: {
			  // 点击抽奖按钮触发回调
			      startCallBack () {
					 
			        // 先开始旋转
			        this.$refs.luckyWheel.play()
			        // 使用定时器来模拟请求接口
			        setTimeout(() => {
			          // 3s后得到中奖索引
			        
			          // 缓慢停止游戏
			          this.$refs.luckyWheel.stop( Math.floor((Math.random() * 16) ))
			        }, 3000)
			      },
			      // 抽奖结束触发回调
			      endCallBack (prize) {
			        // 奖品详情
					var that = this;
					uni.showModal({
						title: '哈哈哈哈',
						content:'你今天吃'+prize.title,
						confirmText:'换一个',
						cancelText:'爬',
						 success (res) {
						        if (res.confirm) {
						          that.startCallBack()
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
					})
			        console.log(prize)
			      }
		}
	}
</script>

<style lang="scss" >
	.roll{
		.lucky-box{
			margin: 60rpx auto;
		}
	}
</style>
