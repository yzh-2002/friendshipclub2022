<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<button id="joinBall" @click=joinBall>click here</button>
		</view>
	</view>
</template>

<script>

	// import {test} from "@/api/main.js"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
      joinBall() {
        wx.cloud.callFunction({
          name: 'getMatch',
          data:{
            openId:'78d8343762528bfb0003c2f92f09dbb6',
            _id:'78d834376252d08c000d54d26d8305cd',
            a:1
          }
        }).then(res=>{
          console.log(res)

        })
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
