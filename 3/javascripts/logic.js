$(function() {
  // DOM構築完了
  
  // ロジックを定義する
  var ajaxLogic = {
    __name: 'ajaxLogic',
    
    // 3. データを取得して返却
    getLocalData: function(path) {
      var dfd = this.deferred();
      h5.ajax(path, {
        type: 'GET'
      })
      .then(function(response) {
        // 取得成功
        dfd.resolve(response);
      })
      .fail(function(err) {
        // 取得失敗
        dfd.reject(err);
      });
      // Promiseオブジェクトを返却します
      return dfd.promise();
    } 
  };
  
  // コントローラの定義
  var logicController = {
    __name: 'logicController',
    ajaxLogic: ajaxLogic,
    
    // 1. ボタンを押した時の処理
    '#button click': function() {
      this.getData(
        // ロジックを呼び出します
        this.ajaxLogic.getLocalData('/content.txt')
      );
    },
    
    // 2. データを取得して表示するまでの処理
    getData: function(response) {
      if (h5.async.isPromise(response)) {
        // Promiseオブジェクトの場合
        // 処理完了を自分を再帰呼び出し
        response.done(this.own(function(response) {
            this.getData(response);
        }));
      } else {
        // 結果を書き込み
        this.$find('#result').val(response);
      }
    }
  };

  // コントローラ化する
  h5.core.controller('body', logicController);
});