import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useDispatch, useSelector} from "react-redux";
import {uploadFileAction} from "../../../actions/profileActions";
import { message, Spin, Tooltip} from "antd";
import {PlusCircleOutlined} from '@ant-design/icons';

const Dropzone = ({name, msg}) => {
    const dispatch = useDispatch();
    const submitUploadFile = (data, name) => dispatch(uploadFileAction(data, name));
    const {uploadingAvatar, uploadingBanner, profile} = useSelector(state => state.profile);

    const [showDropzone, setShowDropzone] = useState(false);

    const onDropRejected = () => {
        message.warning("No es posible subir el archivo");
    }

    const onDropAccepted = useCallback(async acceptedFiles => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        submitUploadFile(formData, name);
        setShowDropzone(false)
    }, []);

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: 1000000
    });

    const files = acceptedFiles.map(file => (
        <div key={file.lastModified} className="bg-white flex-1 p-5 m-0 shadow-lg rounded-lg">
            <p className="font-bold text-xl text-center">{file.path}</p>
            <p className="text-sm text-gray-500 text-center">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </div>
    ))

    const uploaded = (name) => {
        const publicRoute = process.env.REACT_APP_BACKEND_URL;
        if (name === 'avatar') {
            const routeAvatar = publicRoute + '/avatar/' + profile.avatar;
            return <img className="w-75 mx-auto text-center rounded-lg" src={routeAvatar}/>
        } else {
            const routeBanner = publicRoute + '/banner/' + profile.banner;
            return <img className="w-75 mx-auto text-center rounded-lg" src={routeBanner}/>
        }
    }

    const file = name === 'avatar' ? profile.avatar : profile.banner;
    const loading = name === 'avatar' ? uploadingAvatar : uploadingBanner;

    return (
        <div className="w-100 p-0">
            {!showDropzone && file ?
                <div className="justify-content-center text-center">
                    <Tooltip title={`Cambiar ${name}`}>
                        <a onClick={() => setShowDropzone(true)}> {uploaded(name)}</a>
                    </Tooltip>
                </div>
                :
                <>
                    <Spin tip={"Subiendo..."} spinning={loading}>
                        <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                            <input className="h-100" {...getInputProps()}/>
                            <div className="text-center">
                                {isDragActive ?
                                    <p className="text-2xl text-center text-gray-600 px-4 py-10">
                                        Sueltalo ahora!
                                    </p>
                                    : <p className="text-center text-gray-600 p-5 bg-light rounded-lg shadow"
                                         style={{borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc'}}>
                                        <p className="ant-upload-drag-icon text-primary">
                                            <PlusCircleOutlined style={{fontSize: 35}}/>
                                        </p>
                                        <p className="ant-upload-text text-primary">
                                            {msg}
                                        </p>
                                    </p>
                                }
                            </div>
                        </div>
                    </Spin>
                </>
            }


        </div>
    );
};
export default Dropzone;