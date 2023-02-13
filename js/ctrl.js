var ctrl = {
    musicSwitch: function () {
        const music_state = document.querySelector("meting-js").aplayer.audio.paused;
        if (music_state) {
            document.querySelector("#music-Switch i").classList.remove("fa-play");
            document.querySelector("#music-Switch i").classList.add("fa-pause");
        } else {
            document.querySelector("#music-Switch i").classList.remove("fa-pause");
            document.querySelector("#music-Switch i").classList.add("fa-play");
        }
        document.querySelector("meting-js").aplayer.toggle();
    },

    musicForward: function () {
        document.querySelector("meting-js").aplayer.skipForward();
    },

    musicBackward: function () {
        document.querySelector("meting-js").aplayer.skipBack();
    },
    musicMute: function () {
        document.querySelector("meting-js").aplayer.volume(0.1, true);
    },
    // 深色模式开关
    switchDarkMode: function () {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        if (nowMode === 'light') {
            activateDarkMode()
            saveToLocal.set('theme', 'dark', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
            // document.querySelector("#iconDarkMode").classList.remove("fa-sun")
            // document.querySelector("#iconDarkMode").classList.add("fa-moon")
        } else {
            activateLightMode()
            saveToLocal.set('theme', 'light', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
            // document.querySelector("#iconDarkMode").classList.remove("fa-moon")
            // document.querySelector("#iconDarkMode").classList.add("fa-sun")
        }
        typeof utterancesTheme === 'function' && utterancesTheme()
        typeof changeGiscusTheme === 'function' && changeGiscusTheme()
        typeof FB === 'object' && window.loadFBComment()
        typeof runMermaid === 'function' && window.runMermaid()
    },

    //显示中控台
    showConsole: function () {
        document.querySelector("#console").classList.add("show");
        ctrl.initConsoleState();
    },

    // 隐藏中控台
    hideConsole: function () {
        document.querySelector("#console").classList.remove("show");
    },

    // 歌词显示开关
    ircShowHide: function () {
        const irc = document.querySelector(".aplayer > .aplayer-lrc-hide"); //这里防止与音乐页面的控制冲突
        if (irc === null) {
            document.querySelector(".aplayer > .aplayer-lrc").classList.add("aplayer-lrc-hide");
            document.querySelector("#ircItem").classList.remove("on");
        } else {
            document.querySelector(".aplayer > .aplayer-lrc").classList.remove("aplayer-lrc-hide");
            document.querySelector("#ircItem").classList.add("on");
        }
    },

    // 单栏显示开关
    hideAsideBtn: () => {
        const $htmlDom = document.documentElement.classList
        if ($htmlDom.contains('hide-aside')) {
            saveToLocal.set('aside-status', 'show', 2)
            document.querySelector("#asideItem").classList.remove("on")
        } else {
            saveToLocal.set('aside-status', 'hide', 2)
            document.querySelector("#asideItem").classList.add("on")
        }
        $htmlDom.toggle('hide-aside')
    },

    //初始化console图标
    initConsoleState: function () {
        const irc = document.querySelector(".aplayer > .aplayer-lrc-hide");
        const aplayer = document.querySelector(".aplayer > .aplayer-lrc");
        irc === null && aplayer != null
            ? document.querySelector("#ircItem").classList.add("on")
            : document.querySelector("#ircItem").classList.remove("on");
        saveToLocal.get('aside-status') === 'hide'
            ? document.querySelector("#asideItem").classList.add("on")
            : document.querySelector("#asideItem").classList.remove("on");
        var console_musicBody = document.querySelector("#console .console-music-ctrl-item"); // 更新控制中心尺寸
        var console_musicCover = document.getElementById("console-music-cover");
        console_musicCover.style.height = console_musicCover.offsetWidth + "px";
        console_musicBody.style.height = (console_musicCover.offsetWidth + 240) + "px"; //(12rem + 1.5rem + 1.5rem) * 16 = 240px
        var nowVolume = document.querySelector("meting-js").aplayer.audio.volume;// 当前音量
        document.querySelector("#v_bar").style.width = document.querySelector("#v_bar_bg").offsetWidth * nowVolume + "px";// 音量条进度
    }

}
