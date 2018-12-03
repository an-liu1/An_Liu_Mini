(() => {
    // rework this with a Vue instance
    const vm = new Vue({
        el : "#app",

        data : {
            // singlecooperinfo: [],
            cooperinfo: [],
            
            modelname : "",
            modelpricing : "",
            modeldetails : "",
            placeholderimg: "",
            videosource: ""
           // videosrc = "mini_1.mp4" 
        },

        mounted: function() {
            console.log('mounted');
            
            this.addPreloader(document.querySelector('.modelInfo'));
            document.querySelector('#F55').click();
        },

        updated: function() {
            console.log('updated');
            let preloader = document.querySelector('.preloader-wrapper');
            setTimeout(function(){
                preloader.classList.add('hidden');
                document.body.appendChild('.preloader');
            }, 3000);
        },

        methods : {
            volOn(e){
                //catch the event
               // console.log('moused over the video');
                e.currentTarget.muted = false;
            },

            volOff(e){
               // console.log('moused off the video');
                e.currentTarget.muted = true;
            },

            openVideo(e){
                e.preventDefault();
                videoData = e.currentTarget.getAttribute('href');
                console.log(videoData);
                this.videosource = videoData; 
                
            },

            addPreloader(parentEl){
                parentEl.appendChild(document.querySelector('.preloader-wrapper'));

                bodymovin.loadAnimation({
                    wrapper: document.querySelector('.preloader'),
                    animType: 'svg',
                    loop: true,
                    path: './data/psychographics.json'
                });
            },

            fetchData(e) {
                //debugger;
                // gets the id of the element via the event object
                let targetURL = e.currentTarget.className.split(' ')[1];
                
                fetch(`./includes/connect.php`)
                .then(res => res.json())
                .then(data => {
                    // if (carModel) {
                    //     console.log(data);
                    //     this.singlecooperinfo = data;
                    // } else {
                    console.log(data);
                    this.cooperinfo = data;
                    //target = e.currentTarget.className.split(' ')[1];
                    console.log(targetURL);
                    this.modelname = data[targetURL].modelName;
                    this.modeldetails = data[targetURL].modelDetails;
                    this.modelpricing = data[targetURL].pricing;
                    // this.placeholderimg = data.placeholder;
                    //const { modelName, pricing, modelDetails, path} = data;

                     //this.modelname = data[0].modelName;
                    // this.modeldetails = modelDetails;
                    // this.modelpricing = pricing;
                    // this.videosource = path;
                    // }
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
        }
    });
})();