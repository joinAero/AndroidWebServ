# ![Logo](https://github.com/joinAero/AndroidWebServ/raw/master/res/drawable-mdpi/ic_launcher.png) AndroidWebServ

A http server for file management on android. And it is achieved by native android httpcore API.

---

*App on phone:*

![App on phone](https://github.com/joinAero/AndroidWebServ/raw/master/ImgApp.png)

*Browse in Chrome:*

![Browse in Chrome](https://github.com/joinAero/AndroidWebServ/raw/master/ImgWeb.png)

## Libs

[jangod](https://code.google.com/p/jangod/): jangod-core.jar & src/temp

* Render html templates similar as django template syntax.
* Customize some tags for android to get its resources.

[Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/): commons-io-2.4.jar & src/upload

* Add file upload capability to http server.
* Implement `HttpServFileUpload` for `HttpRequest`.

[Apache Ant](http://ant.apache.org/): ant-zip.jar

* Ant zip part for chinese garbled problem.

[ZXingSimple](https://github.com/joinAero/ZXingSimple): zxing-core.jar & src/zxing

* Use to scan QRCode and generate it.

[jQuery](http://jquery.com/): jquery-1.9.1.min.js

* Much simpler to write JavaScript.

[AjaxFileUpload](http://www.phpletter.com/Our-Projects/AjaxFileUpload/): ajaxfileupload.min.js

* Do some amendments for several problems.

## Download

[AndroidWebServ-release-v1.0.apk](https://add110.opendrive.com/files?70641844_EYGvD)
