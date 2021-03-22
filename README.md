# coderhub
一个基于Nodejs和Koa开发的一系列接口

接口目录

1. 用户注册接口
2. 用户登陆接口
3. 用户发送动态接口
4. 获取单条用户动态接口
5. 获取多条条用户动态接口
6. 用户修改动态接口
7. 用户删除动态接口
8. 用户给动态添加标签接口
9. 获取动态图片接口
10. 用户对动态发表评论接口
11. 用户对某个动态的某个评论发表回复接口
12. 用户修改评论接口
13. 用户删除评论接口
14. 获取评论列表接口
15. 创建标签接口
16. 获取标签列表接口
17. 根据动态ID获取对应动态所含有的标签接口
18. 用户上传头像接口
19. 获取用户头像接口
20. 用户上传动态图接口
---

**1\. 用户注册接口**
###### 接口功能
> 从服务器中注册一个用户

###### URL
> [/user]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|name    |ture    |string|注册的用户名                          |
|password|true    |string|对应的用户密码                        |

###### 返回字段
在正常注册后返回修改了数据库的对象

###### 接口示例
> 地址：[http://localhost:8080/user]()
``` javascript
{
    "name" : "xiaoLam",
    "password": "123"
}
```
---

**2\. 用户登陆接口**
###### 接口功能
> 用户登陆

###### URL
> [/login]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|name    |ture    |string|用户名                          |
|password|true    |string|对应的用户密码                        |

###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |登陆用户的ID   |
|name  |string | 用户名                      |
|token |string |返回的token                         |

###### 接口示例
> 地址：[http://localhost:8080/login]()
``` javascript
{
    "name" : "xiaoLam",
    "password": "123"
}
```
###### 返回字段示例
``` js
// 正常登陆
{
    "id": 10,
    "name": "xiaoLam",
    "token": "XXXXXXXXXXXX"
}
// 登陆错误会返回对应的错误信息
```
---

**3\. 用户发送动态接口**
###### 接口功能
> 用户发送动态, 将动态信息存放在数据库中

###### URL
> [/moment]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|content    |ture    |string|动态内容                          |

###### 返回字段
发送动态成功后返回修改数据库信息的对象

###### 接口示例
> 地址：[http://localhost:8080/moment]()
``` javascript
{
    "content": "test"
}
```
---

**4\. 获取单条用户动态接口**
###### 接口功能
> 根据动态的ID获取单条动态

###### URL
> [/moment/:momentId]()

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|momentId    |ture    |int|需要获取的单条动态的id                          |

###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |动态的id   |
|content  |string | 动态内容                      |
|createTime |string |创建动态的时间                         |
|updateTime |string |更新动态的时间                         |
|author |object |动态作者的信息                         |
|images |array |动态的图片URL地址                         |
###### 接口示例
> 地址：[http://localhost:8080/moment/1]()

###### 返回字段示例
``` js
{
    "id": 1,
    "content": "xiaoLam最帅",
    "createTime": "2021-03-14T07:13:57.000Z",
    "updateTime": "2021-03-14T07:13:57.000Z",
    "author": {
        "id": 10,
        "name": "somin",
        "avatavaUrl": "http://localhost:8000/user/10/avatar"
    },
    "images": [
        
    ]
}
```
---

**5\. 请求多条动态接口**
###### 接口功能
> 根据传入的offset和size返回多条动态

###### URL
> [/moment]()

###### 支持格式
> Query

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|offset    |true    |int|从第几条动态开始获取                          |
|size|true    |int|获取动态的数量                        |

###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |动态的id   |
|content  |string | 动态内容                      |
|createTime |string |创建动态的时间                         |
|updateTime |string |更新动态的时间                         |
|author |object |动态作者的信息                         |
|images |array |动态的图片URL地址                         |

###### 接口示例
> 地址：[http://localhost:8080/moment?offset=0&size=2]()


###### 返回字段示例
``` js
[
    {
        "id": 1,
        "content": "xiaoLam最帅",
        "createTime": "2021-03-14T07:13:57.000Z",
        "updateTime": "2021-03-14T07:13:57.000Z",
        "author": {
            "id": 10,
            "name": "somin",
            "avatavaUrl": "http://localhost:8000/user/10/avatar"
        },
        "commentCount": 2,
        "labelCount": 5,
        "images": [有图片则返回一个数组]
    },
    {
        "id": 2,
        "content": "xiaoLam最帅, yeah",
        "createTime": "2021-03-14T07:16:42.000Z",
        "updateTime": "2021-03-14T07:16:42.000Z",
        "author": {
            "id": 10,
            "name": "somin",
            "avatavaUrl": "http://localhost:8000/user/10/avatar"
        },
        "commentCount": 0,
        "labelCount": 0,
        "images": null
    }
]
```
---

**6\. 用户修改动态接口**
###### 接口功能
> 请求携带token, 和修改后的content根据动态id来修改动态

###### URL
> [/moment/momentId]()

###### 支持格式
> JSON

###### HTTP请求方式
> PATCH

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |ture    |Bearer Token|用户登陆后返回的token                          |
|content|true    |string|修改后的动态内容                        |

###### 返回字段
成功修改后返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/moment/momentId]()
``` javascript
{
    "content": "test"
}
```
---

**7\. 用户修改动态接口**
###### 接口功能
> 请求携带token, 根据momentId来删除对应的动态

###### URL
> [/moment/momentId]()

###### 支持格式
> JSON

###### HTTP请求方式
> DELETE

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |ture    |Bearer Token|用户登陆后返回的token                          |


###### 返回字段
成功修改后返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/moment/momentId]()

---

**8\. 用户给动态添加标签接口**
###### 接口功能
> 根据momentId给对应的动态添加标签

###### URL
> [/moment/momentId/labels]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|labels    |true    |int|需要添加的标签                          |

###### 返回字段
返回标签添加成功字符串

###### 接口示例
> 地址：[http://localhost:8080/moment/1/labels]()
``` js
{
    "labels": ["前端", "文学", "爱情", "诗", "手机"]
}
```
---

**9\. 获取动态图片接口**
###### 接口功能
> 根据filename和type需要获取图片的大小来获取对应的动态图片

###### URL
> [/moment/images/:filename]()

###### 支持格式
> query params

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|filename    |true    |string|需要获取的动态图片名称                          |
|type    |true    |small/middle/large|图片的大小                          |

###### 返回字段
返回图片

###### 接口示例
> 地址：[http://localhost:8080/moment/images/48b78f04244ecfd75b52d152fd984532?type=small]()
---

**10\. 用户对动态发表评论接口**
###### 接口功能
> 根据momentId给对应的动态发表评论, 需要携带token

###### URL
> [/comment/:momentId]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true    |string|用户登陆凭证                          |
|content    |true    |string|评论内容                          |

###### 返回字段
返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/comment/1]()
``` js
{
    "content": "you are my friends"
}
```
---

**11\. 用户对某个动态的某个评论发表回复接口**
###### 接口功能
> 根据momentId和commentId给对应的动态中对应的评论发表回复

###### URL
> [/comment/:momentId/:commentId/reply]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true    |string|用户登陆凭证                          |
|content    |true    |string|评论内容                          |

###### 返回字段
返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/comment/1/2/reply]()
``` js
{
    "content": "you are my friends too"
}
```
---

**12\. 用户修改评论接口**
###### 接口功能
> 根据commentId修改对应的评论

###### URL
> [/comment/:commentId]()

###### 支持格式
> JSON

###### HTTP请求方式
> PATCH

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true    |string|用户登陆凭证                          |
|content    |true    |string|修改后的内容                          |

###### 返回字段
返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/comment/4]()
``` js
{
    "content": "test test"
}
```
---


**13\. 用户删除评论接口**
###### 接口功能
> 根据commentId删除对应的评论

###### URL
> [/comment/:commentId]()

###### 支持格式
> JSON

###### HTTP请求方式
> DELETE

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true    |string|用户登陆凭证                          |


###### 返回字段
返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/comment/4]()
---

**14\. 获取评论列表接口**
###### 接口功能
> 根据momentId获得对应动态的所有评论

###### URL
> [/comment]()

###### 支持格式
> params

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|momentId    |true    |int|需要获取评论的对应动态Id                          |


###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |评论的id   |
|content  |string | 评论的内容                      |
|commentId  |int | 对应评论的id, 如果是评论的回复才会有值                      |
|createTime |string |创建评论的时间                         |
|updateTime |string |更新评论的时间                         |
|user |object |动态作者的信息                         |

###### 接口示例
> 地址：[http://localhost:8080/comment/4]()

###### 返回字段示例
``` js
[
    {
        "id": 4,
        "content": "test修改评论",
        "commentId": null,
        "createTime": "2021-03-15T06:36:14.000Z",
        "updateTime": "2021-03-15T06:36:14.000Z",
        "user": {
            "id": 10,
            "name": "somin"
        }
    }
]
```
---

**15\. 创建标签接口**
###### 接口功能
> 创建标签, 需要token

###### URL
> [/label]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true   |Bearer Token |用户登陆凭证                          |
|name    |true    |string|标签名称                          |


###### 返回字段
返回修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/label]()

``` js
{
    "name": "青春"
}
```
---


**16\. 获取标签列表接口**
###### 接口功能
> 根据limit获取标签数量和offset从哪一条开始获取来获取标签列表

###### URL
> [/label]()

###### 支持格式
> Query

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|limit    |true    |int|需要获取标签的数量           |
|offset    |true    |int|从哪一条标签开始获取           |


###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |标签的id   |
|name  |string | 标签名                      |
|createTime |string |创建标签的时间                         |
|updateTime |string |更新标签的时间                         |

###### 接口示例
> 地址：[http://localhost:8080/label?limit=1&offset=0]()

###### 返回字段示例
``` js
[
    {
        "id": 1,
        "name": "JavaScript",
        "createAt": "2021-03-15T11:32:31.000Z",
        "updateAt": "2021-03-15T11:32:31.000Z"
    }
]
```
---

**17\. 根据动态ID获取对应动态所含有的标签接口**
###### 接口功能
> 根据动态ID获取对应动态所含有的标签

###### URL
> [/label/:momentId]()

###### 支持格式
> params

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|momentId    |true    |int|需要获取标签的动态的ID           |


###### 返回字段
|返回字段|字段类型|说明                              |
|:-----   |:------|:-----------------------------   |
|id   |int    |标签的id   |
|name  |string | 标签名                      |

###### 接口示例
> 地址：[http://localhost:8080/label/1]()

###### 返回字段示例
``` js
[
    {
        "id": 7,
        "name": "前端"
    }
]
```
---

**18\. 用户上传头像接口**
###### 接口功能
> 用于用户上传头像, 需要token

###### URL
> [/upload/avatar]()

###### 支持格式
> data-form

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|token    |true    |Bearer Token|用户登陆凭证           |
|avatar    |true    |file|需要上传的头像文件           |


###### 返回字段
返回修改数据库成功的信息对象

###### 接口示例
> 地址：[http://localhost:8080/upload/avatar]()
> 文件: key: avatar; value: 对应的图片文件

---

**19\. 获取用户头像接口**
###### 接口功能
> 根据用户ID获取用户头像

###### URL
> [/user/:userId/avatar]()

###### 支持格式
> Params

###### HTTP请求方式
> GET

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|userId    |true    |int|需要获取的头像所属的用户的id           |


###### 返回字段
返回对应用户的头像

###### 接口示例
> 地址：[http://localhost:8080/user/10/avatar]()

---

**20\. 用户上传动态图接口**
###### 接口功能
> 用户根据动态Id给对应的动态添加图片

###### URL
> [/upload/picture]()

###### 支持格式
> Query form-data

###### HTTP请求方式
> POST

###### 请求参数
|参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                                |
|momentId    |true    |int|需要添加图片的动态Id           |
|picture    |true    |file|图片文件           |

###### 返回字段
返回成功修改数据库的信息对象

###### 接口示例
> 地址：[http://localhost:8080/upload/picture?momentId=1]()
> 文件: key: picture; value: 对应的图片文件
---




