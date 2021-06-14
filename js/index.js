new Vue({
    el: '#app',
    data: function () {
        return {
            //input:'',
            cardInfo: {  //显示的银行卡信息
                name: '',
                time: '',
                money: '',
                type: ''
            },
            tableData: [],
            dialogVisible: false,  //控制弹框的显示(不显示)
            editObj: {
                name: '',
                time: '',
                money: '',
                type: ''
            },
            userIndex: 0,
            fileList: []
        }
    },
    methods: {
        addCard() {
            this.tableData.push(this.cardInfo)
            this.cardInfo = {
                name: '',
                time: '',
                money: '',
                type: ''
            }
        },

        //删除一组用户信息
        delCard(idx) {
            this.$confirm('确认删除此信息？')
                .then(_ => {
                    this.tableData.splice(idx, 1); //此处是重点难点，分析vue源码有帮助与理解
                })
                .catch(_ => { });
        },

        //编辑数据
        editCard(item, idx) {
            // console.log(item);
            this.userIndex = idx;
            this.editObj = {
                name: item.name,
                time: item.time,
                money: item.money,
                type: item.type
            };
            this.dialogVisible = true;
        },

        handleClose() {
            this.dialogVisible = false;
        },

        confirm() {
            this.dialogVisible = false;
            //Vue对象提供的静态方法
            Vue.set(this.tableData, this.userIndex, this.editObj);
            //下面的方法不可以，因为事件可以监听到但不能及时渲染到页面上去
            //this.tableData[this.userIndex] = this.editObj;
        },

        download() {
            // 点击下载  
            const data = JSON.stringify(this.tableData)
            const blob = new Blob([data], { type: "text/plain;charset=utf-8" })
            saveAs(blob, 'data.json')
        },

        readfile(e) {
            let file = e.raw;
            const reader = new FileReader();         //实例化一个FileReader对象
            reader.readAsText(file);
            let that = this
            reader.onload = function () {
                // console.log(JSON.parse(reader.result));
                that.tableData = JSON.parse(reader.result);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };

        },
        submitUpload() {
            console.log(this.fileList);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
});