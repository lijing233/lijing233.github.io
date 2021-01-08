var PageConfig = {
  boy: 'ant',
  itemList: [
    'apple',
    'cake',
    'candy',
    'potato',
    'tomato',
    'doughnut'
  ],
  btnHoverList: [
    'tips',
    'replay'
  ],
  music: {
    bgMusic: {
      id: 'bgMusic',
      src: './wav/bgSound.wav'
    },
    itemMusic: {
      dad: {
        id: 'dadMusic',
        src: './wav/dad.wav'
      },
      mom: {
        id: 'momMusic',
        src: './wav/mom.wav'
      },
      teacher: {
        id: 'teacherMusic',
        src: './wav/teacher.wav'
      }
    },
    overMusic: {
      id: 'overMusic',
      src: './wav/verySwart.wav'
    },
    btnHoverMusic: {
      id: 'btnHover',
      src: './wav/btnHover.wav'
    },
    musicMap: {
      cake: "dad",
      tomato: "dad",
      candy: "mom",
      doughnut: "mom",
      potato: "teacher",
      apple: "teacher",
    }
  }
}
var PageAnimation = new MyAnimation(PageConfig)
