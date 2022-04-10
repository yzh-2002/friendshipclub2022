<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<text>{{location}}</text>
			<button @click="credit">点击打卡</button>
			<button @click="login">点击登录</button>
		</view>
	</view>
</template>

<script>
import {userLogin} from "@/api/userLogin.js"
import {getLocation} from "@/api/getLocation.js"
	export default {
		data() {
			return {
				title: '暂未登录',
				location:"电子科技大学沙河足球场"
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				userLogin().then(res=>{
					console.log(res)
				})
			},
			credit(){
				getLocation().then(res=>{
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
