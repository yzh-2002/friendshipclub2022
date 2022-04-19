<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<button @click="test">点击打卡</button>
			<button @click="login">点击登录</button>
		</view>
	</view>
</template>

<script>
import Vue from "vue"
import {userLogin} from "@/api/userLogin.js"
import {GetLocation} from "../../../utils/Applets/reverseGeocoder"
import {CalculateDistance} from "../../../utils/Applets/calculateDistance"
	export default {
		data() {
			return {
				title: '暂未登录',
			}
		},
		onLoad() {

		},
		methods: {
			test(){
				wx.cloud.callFunction({
					name:"credit"
				}).then(res=>{
					console.log("正在计算距离......");
					CalculateDistance([res.result.location])
				})
			},
			login(){
				userLogin().then(res=>{
					console.log(res)
				})
			},
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
