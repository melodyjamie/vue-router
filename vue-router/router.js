var router=new VueRouter({
    mode:"hash",
    routes:[
        {   path:"/",
            component:Main,
            children:[
                {
                    path:"",
                    components:{
                        left:Left,
                        right:Right
                    }
                }
            ]
        },
        {
            path:"/quick",
            component:Quick
        }
    ]

})