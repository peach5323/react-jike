import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addArticleAPI, getArticleDetailAPI, editArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
import { useForm } from 'antd/es/form/Form'

const { Option } = Select

const Publish = () => {

  // 获取频道列表
  const {channels}= useChannel()

  // 通过useRef创建一个暂存仓库，在上传完毕图片的时候把图片列表存入
  const cacheImgList = useRef([])
  const [imgList, setImgList] = useState([])
  // 上传图片
  const onUploadChange = (info) => {
    // console.log(info);
    setImgList(info.fileList)
    cacheImgList.current = info.fileList
  }

  const [imgType, setImgType] = useState(0)

  // 切换封面图片类型
  const onRadioChange = (e) => {
    // console.log(e);
    setImgType(e.target.value)
    if (e.target.value === 0) {
      setImgList([])
    } else if (e.target.value === 1) {
      // 单图，截取第一张展示
      setImgList(cacheImgList.current[0] ? [cacheImgList.current[0]] : [])
    } else {
      // 三图，取所有图片展示
      setImgList(cacheImgList.current)
    }
  }

  const [draft, setDraft] = useState(false)
  const navigate = useNavigate()
  // 发布文章/草稿
  const onFinish = async (formData) => {
    // console.log(formData);
    if(imgList.length !== imgType) return message.warning('封面类型与图片数量不匹配')

    const { channel_id, content, title } = formData
    const params = {
      id:articleId,
      channel_id,
      content,
      title,
      cover: {
        type: imgType,
        images: imgList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }}
        )
      }
    }
    if (articleId) {
      await editArticleAPI({ id: articleId, data: {...params} })
    } else {
      await addArticleAPI({ draft, data: params })
    }
    
    if (draft) {
      message.success('存为草稿成功')
    } else {
      message.success('发布文章成功')
    }

    navigate('/article')
  }

  // 数据回显
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例
  const [dataForm] = useForm()
  // 编辑
  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await getArticleDetailAPI(articleId)
      const data = res.data
      // 1. 回显表单数据
      const { cover: { type, images } } = data
      dataForm.setFieldsValue({
        ...data,
        type
      })
      // 2. 回显封面图片
      setImgType(type)
    const imageUrls =  images.map(url => { return { url } })
      setImgList(imageUrls)
      cacheImgList.current = imageUrls
    }

    // 根据id做适配
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, dataForm])


  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId?'编辑':'发布'}文章` },
          ]}
          />
        }
      >
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: imgType,channel_id:'' }}
          form={dataForm}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
             
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* {需要给Upload组件添加fileList属性，达成受控的目的 } */}
            {imgType > 0 && <Upload
              name='image'
              maxCount={imgType}
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              multiple={imgType > 1}
              fileList={imgList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
            
          </Form.Item>
          <Form.Item
            id="content"
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
              />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              {/* {onClick = { onDraft } } */}
              <Button onClick={()=>setDraft(true)} size="large" htmlType="submit">
                存为草稿
              </Button>
              <Button onClick={() => setDraft(false)} size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish