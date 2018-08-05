new Vue({
	el:'.container',
	data:{
		addressList:[],
		limitNumber:3,
		currentIndex:0,
		shoppingMethod:1,
		pindex:0
	},
	mounted(){
		this.$nextTick(() => {
			this.getAddressList();
		});
	},
	computed:{
		filterAddress(){
			return this.addressList.slice(0,this.limitNumber);
		}
	},
	methods:{
		getAddressList(){
			// let _this=this;
			this.$http.get("data/address.json").then((response) => {
				var res = response.data;
				if(res.status=="0"){
					this.addressList=res.result;
				}
			});
        },
        // loadMore(){
        //     this.limitNumber = this.addressList.length;
        // },
		setDefault(addressId){
			this.addressList.forEach((address,index) => {
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			});
		},
		delProduct(){
			this.addressList.splice(this.pindex,1);
		},
		showOrHide(limitNumber){
			if(this.limitNumber==3){
				this.limitNumber=this.addressList.length;
			}else{
				this.limitNumber=3;
			}
		}
	}
});