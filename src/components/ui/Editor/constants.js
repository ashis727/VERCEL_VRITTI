import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import AttachesTool from '@editorjs/attaches';
import { Constants } from '@/constants/constants'


export const EDITOR_TOOLS = {
  Embed: Embed,
  Table: Table,
  Marker: Marker,
  List: List,
  Warning: Warning,
  // Code: Code,
  LinkTool: LinkTool,
  Image: {
    class: Image,
    config: {
      endpoints: {
        byFile: Constants?.API_URL+'/blogs/uploadi/', // Your backend file uploader endpoint
        byUrl: Constants?.API_URL+'/blogs/uploadi/', // Your endpoint that provides uploading by Url
      }
    },},
    Attaches: {
      class: AttachesTool,
      config: {
        endpoint: Constants?.API_URL+'/blogs/uploadf/'
      }
    },
  Raw: Raw,
  Header:  {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [2, 3, 4],
      defaultLevel: 3
    }},
  Quote: Quote,
  Checklist: CheckList,
  Delimiter: Delimiter,
  InlineCode: InlineCode,
  SimpleImage: SimpleImage,
}
