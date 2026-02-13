import { images, videos } from "./images";


export const all_products = [

    {
        _id:'jkdcjh09876564334v7t',
        title:'Brand new Ft-24 Tractor',
        images:[images.tractor_2],
        price:12000000,
        category:'Tools',
        description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
    {
        _id:'jkdcjh389064334v7t',
        title:'New Wheelbarrow strong blue',
        images:[images.wheel_1],
        price:180000,
        category:'Seeds',
        description:`orem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
    {
        _id:'j0000064334v7t',
        title:'Water Pump Electric hybrid',
        images:[images.pump_1],
        price:3260000,
        category:'Tools',
        description:`orem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
    {
        _id:'jkdcj4356784334v7t',
        title:'New Metallic Wheelbarrow strong',
        images:[images.wheel_2],
        price:120000,
        category:'Tools',
        description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
    {
        _id:'jkdcjh300334v7t',
        title:'New class-4 Diesel Tractor',
        images:[images.tractor_3],
        price:1300000,
        category:'Toola',
        description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
    {
        _id:'jkdcjh9087334v7t',
        title:'Super strong water pump 20x',
        images:[images.pump_2],
        price:520000,
        category:'Tools',
        description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus.`
    },
];


export const all_articles = [

    {
        _id:'opoy00gcghhbj',
        images:[images.article_2],
        author:{
        username:"Baguma Sulaiman",
        profile_pic:images.product_1
        },
        title:"How best to use pesticides in your garden",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
    {
        _id:'opoyty98765789rdtrfgcghhbj',
        images:[images.machiney_item],
        author:{
        username:"Twesigye Fahad",
        profile_pic:images.product_1
        },
        title:"This is how the tractors used in gardens are now highly recommended for modern farmers",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
    {
        _id:'opoyty98765789rdtrfgcghhbj',
        images:[images.article_3],
        author:{
        username:"Twesigye Fahad",
        profile_pic:images.product_1
        },
        title:"How can you keep your banana plantation healthy",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
]


export const all_videos = [

    {
        _id:"jkh09876543bvhj",
        title:"Engeri yokulima ebitooke obulungi obifunemu akasente",
        files:[videos.video_one],
        thumbnail:images.article_2,
        created_by:{
          profile_pic:images.product_1,
        },
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
    {
        _id:"jkh09876876543bvhj",
        title:"Okulima enyaya awafunda, nendabirira yazo entufu",
        files:[videos.video_one],
        thumbnail:images.article_4,
        created_by:{
          profile_pic:images.product_1,
        },
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
    {
        _id:"j000006876543bvhj",
        title:"Okulima enyaya awafunda, nendabirira yazo entufu",
        files:[videos.video_one],
        thumbnail:images.article_10,
        created_by:{
          profile_pic:images.product_1,
        },
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    },
    {
        _id:"j000006876543bvhj",
        title:"The best practices when applying NPK Fertilizers",
        files:[videos.video_one],
        thumbnail:images.article_7,
        created_by:{
          profile_pic:images.product_1,
        },
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellat autem eaque perferendis libero asperiores dolores non, eos provident quae repellendus laudantium commodi qui quaerat deleniti magnam sunt. Quibusdam, ducimus"
    }
    
];



export const all_notifications = [

    {
        _id:'lhcg9876556700uiuuye',
        text:'This is the testing of the notification message that is here',
        type:'New Deal'
    },
    {
        _id:'lhc87654kuiuuye',
        text:'This is the testing of the notification message that is here',
        type:'Account security'
    },
    {
        _id:'lhcgud-098765kuiuuye',
        text:'This is the testing of the notification message that is here',
        type:'New Deal'
    },
    {
        _id:'lhcgudv987kuiuuye',
        text:'This is the testing of the notification message that is here',
        type:'Prize'
    }
]

export const categories = [

    {
        _id:'lkj765432GC89765',
        title:'Tools',
        image:images.pump_2
    },
     {
        _id:'lk09870989765',
        title:'Pesticides',
        image:images.pesticides_item
    },
     {
        _id:'lkj0987689765',
        title:'Fertilizers',
        image:images.fertilizer_1
    },
    {
        _id:'lkj0987609889765',
        title:'Seeds',
        image:images.seeds_1
    },
]

export const all_stores = [

    {
        _id:'ihj0004656778',
        image:images.product_1,
        name:'Green farm Agro supplies',
        location:'Kampala Uganda',
        dealing_in:'Fertilizers,Machinery,Seeds'
    },
    {
        _id:'ihj0987006778',
        image:images.product_1,
        name:'Green farm Agro supplies',
        location:'Kampala Uganda',
        dealing_in:'Fertilizers,Machinery,Seeds'
    },
    {
        _id:'ihj0987656778',
        image:images.product_1,
        name:'Green farm Agro supplies',
        location:'Kampala Uganda',
        dealing_in:'Fertilizers,Machinery,Seeds'
    },
    {
        _id:'i0000cf4656778',
        image:images.product_1,
        name:'Green farm Agro supplies',
        location:'Kampala Uganda',
        dealing_in:'Fertilizers,Machinery,Seeds'
    },
]

export const questions = [

    {
      _id:'987654yhgcvvbnm98',
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
      question:'How can one control this pest that has started emerging among maize farmers?',
      answered:true,
      answerCount:12
    },
    {
      _id:'987654yhgcvvbnm98',
      question:'How can one control this pest that has started emerging among maize farmers?',
      answered:true,
      answerCount:12,
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
    },
    {
      _id:'987654yhgcvvbnm98',
      question:'How can one control this pest that has started emerging among maize farmers?',
      answered:false,
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
      answerCount:0
    }
]

export const answers = [

    {
        _id:'098765rtdgfvbnm',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
        answer:'I think you should go and buy Argona pesticede because it works better on such issues'
    },
    {
        _id:'0987tdgfvbnm',
         description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
        answer:'I think you should go and buy Argona pesticede because it works better on such issues'
    },
    {
        _id:'098765rtdgf709nm',
         description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
        answer:'I think you should go and buy Argona pesticede because it works better on such issues'
    },
    {
        _id:'980987tghjnbvh',
         description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati libero, doloribus quia tempora, dicta mollitia veritatis officia soluta cumque enim minus deleniti fugiat ut molestias nulla voluptatum? Voluptates, numquam.',
        answer:'I think you should go and buy Argona pesticede because it works better on such issues'
    },
]

export const all_messages = [

    {
        _id:'oiuyttdfxcvbbnb',
        message:"Hi, how are you there?",
        from:"you"
    },
    {
        _id:'oiu098fxcvbbnb',
        message:"Hi, i am fine please how can i help you?",
        from:"other"
    },
    {
        _id:'oiuyt09861cvbbnb',
        message:"There is a very nice product i saw that came from your store",
        from:"you"
    },
    {
        _id:'oiu098fxcvbbnb',
        message:"Can you please let me know?",
        from:"other"
    },
]