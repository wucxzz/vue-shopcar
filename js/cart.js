const vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
		fomatMoney(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted(){
		this.$nextTick(() => {
			vm.cartView();
		})
	},
	methods:{
		cartView:function(){
			let _this = this;
			
			this.$http.get("data/cartData.json",{"id":123}).then((res) => {
				this.productList = res.data.result.list;
			});
		},
		changeMoney(product,way){
			if(way>0){
				product.productQuantity++;
			}else{	
				if(product.productQuantity>1){
					product.productQuantity--;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct(item){
			if(typeof item.checked=='undefined'){
				Vue.set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		checkAll(flag){
			this.checkAllFlag = flag;
			var _this=this;
			console.log(this);
			this.productList.forEach((item,index) => {
				if(typeof item.checked == 'undefined'){
					_this.$set(item,"checked",_this.checkAllFlag);
					console.log(this);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});
			_this.calcTotalPrice();
		},
		calcTotalPrice(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach((item,index) => {
			if(item.checked){
				_this.totalMoney += item.productPrice * item.productQuantity;
			}
			});
        },
        delConfirm(item){
            this.delFlag = true;
            this.curProduct = item;
        },
		delProduct(){
            let index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.delFlag=false;
		}
	}
});
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })