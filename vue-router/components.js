var Main=Vue.component("Main",{
    template:`
    <div class="template">
      <div class="content">
      <div class="left">
         <router-view  name="left"></router-view>
      </div>
      <div class="right">
          <router-view name="right"></router-view>
      </div>
    </div>
    </div>
    `
})

var Left=Vue.component("Left",{
    data(){
        return{
            menu:[
            ]
        }
    },
    computed:{
        datas(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj)
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                               arr[j].child=[];
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    mounted(){
        fetch("./dome.txt").then(function(e){
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    template:`
    <div>
    <ul>
        <div v-for="item in datas">
            <router-link :to="'#'+item.id">{{item.title}}</router-link>
            <ul v-for="item1 in item.child">
                <router-link :to="'#'+item1.id">{{item1.title}}</router-link>
            </ul>
        </div>
</ul>
</div>
    `,
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos=document.querySelector(".a"+num).offsetTop-10;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
                animate()
        }
    }
})

var Right=Vue.component("Right",{
    data(){
        return{
            datas:"",
        }
    },
    template:`
   <div class="markdown-body">
      <div v-html="datas"></div>
   </div>
    `,
    mounted(){
        fetch("./doc.txt").then(function(e){
            return e.text();
        }).then((e)=>{
            this.datas=e;
        })
    }
})

var Quick=Vue.component("Quick",{
    template:`
    <div class="quick">
     这里是官方的 Vue 特有代码的风格指南。
     如果在工程中使用 Vue，为了回避错误、小纠结和反模式，
     该指南是份不错的参考。不过我们也不确信风格指南的所有
     内容对于所有的团队或工程都是理想的。所以根据过去的经验、
     周围的技术栈、个人价值观做出有意义的偏差是可取的。
     对于其绝大部分，我们也总体上避免就 JavaScript 或 HTML 
     的本身提出建议。我们不介意你是否使用分号或结尾的逗号。
     我们不介意你在 HTML 特性中使用单引号还是双引号。不过当我们发现在
      Vue 的情景下有帮助的特定模式时，也会存在例外。
</div>
    `
})

