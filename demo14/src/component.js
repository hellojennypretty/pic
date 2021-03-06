/**
 * Created by Administrator on 2016/6/15.
 */
var IconItem = React.createClass({
    render:function(){
        var src = "img/wrong.png";
        if(this.props.data.thumb_exist==true){
            src = "img/1.jpg";
        }
        var listClass = "filelist ";
        listClass += (this.props.model=="list"?"fileListItem ":"fileListIcon ");
        listClass += (this.props.data.is_selected==true?"item-selected":"")
        return (<div className={listClass}>
                    <input type="checkbox" className="item-checkbox"/>
                    <img loaded="true" src={src}/>
                    <a className="display-name" title={this.props.data.path}>{this.props.data.path}</a>
                    <span className="iconMore">
                        更多
                    </span>
                    <span className="operate">
                        <span id="" className="preview"><i className="icon i-preview" title="{{{'预览'|language}}}">预览</i></span>
                        <span id="" className="link"><i className="icon i-sendlink" title="{{{'分享'|language}}}">分享</i></span>
                        <span id="" className="download"><i className="icon i-download" title="{{{'下载'|language}}}">下载</i></span>
                        <span id="" className="delete"><i className="icon i-delete" title="{{{'删除'|language}}}">删除</i></span>
                    </span>
                </div>);
    }
});

var ContextMenu = React.createClass({
    render:function(){
        var menuStyle = {
            background:'#cccccc',
            display:this.props.contextMenuClass.display,
            position:'absolute',
            left:this.props.contextMenuClass.left,
            top:this.props.contextMenuClass.top
        };
        return <ul className="pop-menu" id="folderContextMenu" style={menuStyle}>
                    <li id="share" className="menu-item share">分享</li>
                    <li id="remove" className="menu-item remove">删除</li>
                    <li id="rename" className="menu-item rename">重命名</li>
                    <li id="copymove" className="menu-item copymove">移动/复制</li>
                    <li id="openFolder" className="menu-item openFolder">查看文件夹</li>
                </ul>
    }
});

var Header = React.createClass({
    render:function(){
        var currentDatas = [];
        $.each(this.props.data, function(idx, item){
            if(item.is_selected){
                currentDatas.push(item);
            }
        });
        if(currentDatas.length==0){
            return <div>图片</div>
        }else if(currentDatas.length==1){
            return <div>
                <span id="" className="preview"><i className="i-preview" title="预览">预览</i></span>
                <span id="" className="link"><i className="i-sendlink" title="分享">分享</i></span>
                <span id="" className="download"><i className="i-download" title="下载">下载</i></span>
                <span id="" className="delete"><i className="i-delete" title="删除">删除</i></span>
            </div>
        }else{
            return <div>
                <span id="" className="link"><i className="i-sendlink" title="分享">分享</i></span>
                <span id="" className="delete"><i className="i-delete" title="删除">删除</i></span>
                </div>

        }
    }
});

var RepoList = React.createClass({
    getInitialState: function() {
        return {
            data: null,
            model:this.props.model,
            contextMenuClass:contextMenuClass
        };
    },
    componentDidMount() {
        this.setState({data: this.props.data});
    },
    update:function(){
        this.setState({data: data,model:model,contextMenuClass:contextMenuClass});
    },
    render: function() {
        if (this.state.data==null) {
            return <span>Loading...</span>;
        }
        else {
            var repos = this.state.data;
            var model = this.state.model;
            var repoList = repos.map(function (repo, index) {
                return (
                    <IconItem key={index} data = {repo} model={model}/>
                );
            });
            return (
                <main>
                    <Header data={this.state.data}/>
                    <div id="list">{repoList}</div>
                    <ContextMenu contextMenuClass={this.state.contextMenuClass}/>
                </main>
            );
        }
    }
});

window.fileList = ReactDOM.render(<RepoList data={data} model={model}/>,
    document.getElementById('fileList'));
