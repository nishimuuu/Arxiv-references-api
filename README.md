# Webデモ環境ジェネレータ

CoffeeScript + Jade + Sass + Pythonでサクッとデモ環境を作成する。

## requirement
- npm (3.8.3)
- python (2.7.10)


## 作り方
1. `npm install --save-dev`を実行する
2. `npm install -g `で下記をインストールする

``
  - gulp  
  - eslint  
  - eslint-config-airbnb  
  - eslint-plugin-jsx-a11y  
  - eslint-plugin-react  
  - eslint-plugin-import  
  - dredd  
  - api-mock   
``

3. `pip install -r requirement.txt`を実行する。
4. `gulp`を実行する
5. `python src/app/EntryPoint.py`を実行する

## 各タスクの実行内容

|タスク名|挙動|
|:------:|:--------------------------------:|
| default | sass, jade, coffeescriptのビルド、webserverの起動, api-blueprintのビルド、api-mockサーバの起動, sphinxサーバの起動, Flaskappの起動|
| sass| sassのビルド | 
| js | jade, coffeeのビルド|
| webserver | Web開発用デモサーバの起動| 
| watch | 対象ディレクトリのファイル変更監視 |
| validate | html,css,jsのlint | 
| api:complile | api-blueprintのビルド |
| api:runserver | apiドキュメントサーバの起動 | 
| api:livecoding | api-blueprintの変更監視と自動リロード |
| api:mock | api-mockサーバの起動 | 
| api:test | dreddの起動 | 
| sphinx:doc:run | 仕様書用Sphinxの起動 |
| sphinx:doc:build | 仕様書用Sphinxのビルド| 
| sphinx:lib:run | アプリケーション用Sphinxの起動 |
| sphinx:lib:build | アプリケーション用Sphinxのビルド| 
| app:run | Flaskappの起動 | 
| app:prod | FlaskappのProduction用スクリプトの生成 | 
| web:prod | フロント資材のProduction用スクリプトの生成 |
| app:deploy | FlaskappをProduction環境にデプロイ| 
| web:deploy | web資材をproduction環境にデプロイ |

## gulpの設定ファイル

gulp.ymlに記述することでsrcとdstの設定、port,urlの設定が可能。


## アプリケーションの設定ファイルの書く所
`src/app/config/config.yaml`に記述すれば自動で読み込まれる。config.yamlのexecute_typeにより、実行する環境に合わせた設定が読み込まれる。

