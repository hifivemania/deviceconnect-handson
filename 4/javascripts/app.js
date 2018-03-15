$(() => {
  var dcLogic = {
    __name: 'DCLogic',
    __services: [],
    __accessToken: null,
    __clientId: null,
    
    // セットアップ処理全体
    setup: function(options) {
      var dfd = this.deferred();
      var results = {};
      this.check(options)
      .then(this.own(function() {
        // 認可を得る
        return this.grant(options);
      }))
      .then(this.own(function(response) {
        results = {
          accessToken: response.accessToken,
          clientId: response.clientId
        };
        // 使えるサービスの一覧を得る
        return this.discover(results);
      }))
      .then(function(services) {
        results.services = services;
        return dfd.resolve(results);
      })
      // エラーの時はここ
      .fail(function(err) {
        dfd.reject(err);
      })
      return dfd.promise();
    },
    
    // DeviceConnectの生死チェック
    check: function(options) {
      var dfd = this.deferred();
      return dfd.promise();
    },
    
    // 認可を得る処理
    grant: function(options) {
      var dfd = this.deferred();
      return dfd.promise();
    },
    
    // サービスをリストアップする処理
    discover: function(options) {
      var dfd = this.deferred();
      return dfd.promise();
    },
    
    // サービスを見つける処理
    findService: function(name) {
    },
    
    // バイブレーション
    vibrate: function() {
      var dfd = this.deferred();
      return dfd.promise();
    },
    
    // ライトのオン、オフ
    light: function(status) {
      var dfd = this.deferred();
      return dfd.promise();
    },
    
    // 通知処理
    notify: function(body) {
      var dfd = this.deferred();
      return dfd.promise();
    }
  };
  
  var appController = {
    __name: 'AppController',
    dcLogic: dcLogic,
    // デフォルトの設定
    
    // コントローラ化が完了したら実行
    __ready: function() {
      this.setup();
    },
    
    // セットアップ処理
    setup: function(response) {
    },
    
    // バイブレーション実行
    '#vibrate click': function (e) {
    },
    
    // ライトをオンにする処理
    '#lightOn click': function(e) {
    },
    
    // ライトをオフにする処理
    '#lightOff click': function(e) {
    },
    
    // 通知ボタンを押した時の処理
    '#notify click': function(e) {
    }
  };
  
  h5.core.controller('.container', appController);
});
