<template>
	<ul>
		<li class="address-li" v-for="item in oldAddress">
			<p>{{item.name}}</p>
			<p>{{item.phone}}</p>
			<p>{{item.address}}</p>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		oldAddress: {
			type: Array
		}
	}
}
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
  padding-left: 0px;
}
.address-li {
   width: 94%;
  background: #fff;
  margin: 1%;
  padding: 1px 2%;
  border-radius: 3px;
}
</style>