window.$utils = {
  checkVerticaScreen: function () {
    var bodyH = document.activeElement.offsetHeight
    var bodyW = document.activeElement.offsetWidth
    var containerW = bodyH > bodyW ? bodyH : bodyW
    var containerH = bodyH < bodyW ? bodyH : bodyW

    $('#app').css('width', containerW + 'px')
    $('#app').css('height', containerH + 'px')

    console.log(window.orientation);

    if (window.orientation == 180 || window.orientation == 0) {
      $('#mask').css('display', 'flex')
      $('#app').css('transform', 'rotate(90deg)')
      $('#app').css('transform-origin', `${containerH/2}px ${containerH/2}px`)
    }
    if (window.orientation == 90 || window.orientation == -90) {
      // alert("横屏状态！");
      $('#mask').css('display', 'none')
      $('#app').css('transform', '')
    }
  },
  reload: function() {
    window.location.reload()
  }
};
// 横竖屏检测
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", $utils.reload, false);
$utils.checkVerticaScreen();

// 点击提示按钮别的地方提示关闭
$(document).click(function () {
  $('.rule').hide();
});

// 初始化
class MyAnimation {
  constructor(config) {
    const {
      boy,
      itemList,
      btnHoverList,
      music: {
        bgMusic,
        itemMusic,
        musicMap,
        overMusic,
        btnHoverMusic
      }
    } = config
    this.boy = boy;
    this.itemList = itemList;
    this.btnHoverList = btnHoverList;
    this.isMoveing = false;

    this.initBoyInfo()
    this.initItemClick()
    this.btnHover()
    // 注册音乐
    this.bgMusic = bgMusic
    this.overMusic = overMusic
    this.itemMusic = itemMusic
    this.musicMap = musicMap
    this.btnHoverMusic = btnHoverMusic
    this.initBgMusic()
    this.initItemMusic()

    // 状态检测
    this.itemStatus = {}
  }

  // 注册背景音乐
  initBgMusic() {
    this.getAudioDom(this.bgMusic)
    var bgMusicEl = document.getElementById(this.bgMusic.id)
    $('body').one('click', () => {
      bgMusicEl.play()
    })

    this.getAudioDom(this.overMusic)
    this.getAudioDom(this.btnHoverMusic)
  }

  // 注册item音乐
  initItemMusic() {
    var itemMusicList = Object.keys(this.itemMusic)
    itemMusicList.forEach(key => {
      this.getAudioDom(this.itemMusic[key])
    })
  }

  // 生audio标签
  getAudioDom({
    id,
    src
  }) {
    var audioDom = new Audio()
    audioDom.src = src;
    audioDom.id = id;
    audioDom.load();
    $('body').append(audioDom)
  }

  // 播方文字音频
  playTextAudio(item) {
    var key = this.musicMap[item]
    if (key) {
      var config = this.itemMusic[key]
      var dom = document.getElementById(config.id)
      dom.play()
    }
  }

  // 注册小人信息
  initBoyInfo() {
    if (!this.boy) return;
    this.boyEl = $(`#${this.boy}`)
    this.boyInitPos = this.boyEl.position()
  }

  // 注册物体点击事件
  initItemClick() {
    if (!this.itemList) return;

    this.itemList.forEach(item => {
      const itemEl = $(`#${item}`)
      itemEl.on('click', () => {
        if (!this.isMoveing) {
          this.isMoveing = true;
          // step1.文字变化
          const itemTextEl = itemEl.find('.name')
            itemTextEl.css('background', 'none')
            itemTextEl.addClass('big-text')
            setTimeout(() => {
                itemTextEl.removeClass('big-text');
                itemTextEl.css('background', 'rgba(255, 255, 255, .6);')
            }, 2000);
          
          // step2.播放音效
          this.playTextAudio(item)

          // step3.蚂蚁走动
          var zindex = itemEl.css('z-index')
          this.boyEl.css('z-index', zindex)
          this.boyGoAndBack(item, itemEl)
        }

      })
    })
  }
  // 小人移动
  async boyGoAndBack(item, itemEl) {
    const itemPos = itemEl.position()
    const itemWidth = itemEl.width()
    const itemHeight = itemEl.height()
    await this.boyMoveAnimite({
        top: `${itemPos.top - itemHeight / 2}px`,
        left: `${itemPos.left + itemWidth - 15}px`
      },
      3000,
      'walk'
    )

    await this.stopMoment()

    this.boyEl.addClass(`${this.boy}-${item}`)
    itemEl.css('display', 'none')

    await this.boyMoveAnimite({
        top: `${this.boyInitPos.top}px`,
        left: `${this.boyInitPos.left}px`
      },
      3000,
      `walk-${item}`
    )

    this.boyEl.removeClass(`${this.boy}-${item}`)

    this.isMoveing = false;

    this.checkOver(item)
  }

  boyMoveAnimite(options, time = 3000, moveClass = 'walk') {
    return new Promise((res, rej) => {
      this.boyEl.addClass(moveClass)
      this.boyEl.animate(options, time, () => {
        this.boyEl.removeClass(moveClass);
        setTimeout(() => {
          res()
        }, 100);
      })
    })
  }

  stopMoment(time = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time);
    })
  }

  checkOver(item) {
    this.itemStatus[item] = true;
    var result = this.itemList.every(i => {
      return this.itemStatus[i] === true
    })

    console.log('result :>> ', result);

    if (result) {
      var dom = document.getElementById(this.overMusic.id)
      dom.play()

      $('.overImg').css('display', 'block')
      setTimeout(() => {
        $('.over-img').css('width', '50rem')
      }, 300);
    }
  }
  // 右侧操作按钮
  btnHover(){
    if (!this.btnHoverList) return;
    this.btnHoverList.forEach((item,index) => {
      const itemEl = $(`.${item}`);
      itemEl.on('click',(e)=>{
        itemEl.addClass('active');
        const music = document.getElementById(this.btnHoverMusic.id)
        music.play();
        // 提示
        if(index === 0){
          e.stopPropagation();
          $('.rule').toggle();
        }
        // 重置
        if(index === 1){
          setTimeout(() => {
            history.go(0);
          }, 500);
        }
      })
    })
  }
}