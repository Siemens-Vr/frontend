"use client"
import React, {useEffect, useState} from 'react';
import styles from '@/app/styles/project/project/project.module.css';
import {FaArrowLeft, FaEllipsisV, FaFolder, FaPlus, FaRegFileAlt, FaUpload} from "react-icons/fa";
import {
    MdFolder,
    MdOutlineFilePresent,
    MdOutlineCreateNewFolder,
    MdUploadFile,
    MdMoreVert,
    MdEdit,
    MdDelete,
  } from "react-icons/md";
import {buildCustomRoute} from "next/dist/lib/build-custom-route";

const Documents = ({uuid}) => {
    const backendUrl = "https://erpbackend-6vez.onrender.com";
    const [folders, setFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');
    const [showOptions, setShowOptions] = useState({}); // Track open menus

    const fetchDocumentsAndFolders = async (folderId = null) => {
        try {
            const fetchUrl = folderId
                ? `${backendUrl}/documents/${uuid}/${folderId}`  // Fetch documents and subfolders for specific folder
                : `${backendUrl}/documents/${uuid}/folders`;     // Fetch root-level documents and folders

            console.log(`Fetching documents and subfolders for ${folderId ? `folder: ${folderId}` : 'root level'}`);

            const response = await fetch(fetchUrl);

            if (!response.ok) {
                console.error("Failed to fetch documents and folders:", await response.text());
                throw new Error('Failed to fetch documents and folders');
            }

            const data = await response.json();
            console.log("Full API Response:", data);  // Log the entire response for debugging

            // Extract documents and subfolders based on the provided structure
            const documents = Array.isArray(data.data) ? data.data : data.data.documents || [];  // Array of documents
            const subfolders = data.subFolders || data.data.folders || [];  // Array of folders or subfolders

            const folderData = {
                id: folderId || 'root',
                name: folderId ? `Folder ${folderId}` : 'Root Folder',
                files: documents.map(doc => ({
                    id: doc.id,
                    uuid: doc.uuid,
                    name: doc.documentName,
                    path: doc.documentPath,
                    createdAt: doc.createdAt,
                })),
                subfolders: subfolders.map(sub => ({
                    id: sub.id,
                    uuid: sub.uuid,
                    name: sub.folderName,
                    description: sub.description,
                    createdAt: sub.createdAt,
                })),
            };

            // Update state with the folder data
            setCurrentFolder(folderData);
            setFolders(prevFolders => (folderId ? prevFolders : [folderData]));

            // console.log("Fetched and Structured Folder Data:", folderData);  // Debugging line for structured data
        } catch (error) {
            console.error('Error fetching documents and folders:', error);
        }
    };


    const handleOpenFolder = (folder) => {
        setCurrentFolder(folder);  // Set the selected folder as `currentFolder`
        fetchDocumentsAndFolders(folder.uuid); // Fetch files and subfolders for the selected folder
    };





    useEffect(() => {
        fetchDocumentsAndFolders();
    }, [uuid]);



    const handleCreateFolder = async () => {
        if (!folderName.trim()) return alert('Folder name is required.');

        const newFolder = {
            folderName: folderName,
            description: folderDescription,
            parentFolderId: currentFolder && currentFolder.id !== 'root' ? currentFolder.id : null,
        };

        // Determine the correct backend URL based on root or subfolder
        const folderUrl = currentFolder && currentFolder.id !== 'root'
            ? `${backendUrl}/subFolders/${currentFolder.id}`   // Subfolder URL if in a subfolder
            : `${backendUrl}/folders/${uuid}`;                 // Root folder URL

        // console.log("Current Folder:", currentFolder);
        // console.log("Parent Folder ID for new folder:", newFolder.parentFolderId);
        // console.log("Attempting to create folder with URL:", folderUrl);
        // console.log("Request payload:", newFolder);

        try {
            const response = await fetch(folderUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFolder),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error response:', errorText);
                throw new Error('Failed to create folder');
            }

            const createdFolder = await response.json();
            console.log('Created folder:', createdFolder);

            // Update folder hierarchy to include the new subfolder
            const newSubfolder = {
                id: createdFolder.uuid,
                name: createdFolder.folderName,
                description: createdFolder.description,
                files: [],
                subfolders: [],
            };

            setFolders(prevFolders => {
                const updatedFolders = [...prevFolders];
                if (currentFolder && currentFolder.id !== 'root') {
                    const folderIndex = updatedFolders.findIndex(f => f.id === currentFolder.id);
                    if (folderIndex !== -1) {
                        updatedFolders[folderIndex].subfolders.push(newSubfolder);
                    }
                } else {
                    updatedFolders.push(newSubfolder);
                }
                return updatedFolders;
            });

            // Reset modal fields and close the modal
            setFolderName('');
            setFolderDescription('');
            setFolderModalOpen(false);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };



    const handleFileSubmit = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        // Determine the correct upload URL based on the current folder's structure
        let uploadUrl;
        if (currentFolder && currentFolder.id !== 'root') {
            // Set the upload URL based on whether it's a folder or subfolder
            uploadUrl = `${backendUrl}/documents/${uuid}/${currentFolder.id}`;
        } else {
            // Root project upload URL
            uploadUrl = `${backendUrl}/documents/${uuid}`;
        }

        console.log("Upload URL:", uploadUrl);
        console.log('Form Data Contents:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Full backend response error:', errorText);
                throw new Error('File upload failed');
            }

            const uploadedFileData = await response.json();
            console.log('Uploaded file:', uploadedFileData);

            const newFile = {
                id: uploadedFileData.id,
                uuid: uploadedFileData.uuid,
                name: uploadedFileData.documentName,
                path: uploadedFileData.documentPath,
                createdAt: uploadedFileData.createdAt,
            };

            setCurrentFolder(prevFolder => ({
                ...prevFolder,
                files: prevFolder.files ? [...prevFolder.files, newFile] : [newFile],
            }));

            setFileModalOpen(false);
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };




    const handleBackToParent = () => {
        const parent = findParentFolder(currentFolder, folders);
        if (parent) {
            // Set to the found parent folder if it exists
            setCurrentFolder(parent);
        } else {
            // If no parent, reset to root view
            fetchDocumentsAndFolders();  // Re-fetch root level contents
        }
    };


    // Update a folder in the hierarchy
    const updateFolderInHierarchy = (folderId, updatedFolder) => {
        const updateFolders = (folders) =>
            folders.map(folder =>
                folder.id === folderId
                    ? updatedFolder
                    : { ...folder, subfolders: updateFolders(folder.subfolders || []) }
            );

        setFolders(prev => updateFolders(prev));
    };

    const findParentFolder = (child, folderList) => {
        for (const folder of folderList) {
            // Ensure folder.subfolders exists and is an array before using `includes`
            if (Array.isArray(folder.subfolders) && folder.subfolders.includes(child)) {
                return folder;
            }
            const found = findParentFolder(child, folder.subfolders || []);
            if (found) return found;
        }
        return null;
    };


    const extractFileName = (documentPath) => {
        if (!documentPath) return 'Unnamed Document';
        const pathSegments = documentPath.split('/');
        const fullName = pathSegments[pathSegments.length - 1];
        // Remove timestamp and prefix if present, e.g., "1731395309241-143269911-CITY TYRES - DRAW PROFESSIONALS 2024.pdf"
        return fullName.replace(/^\d+-\d+-/, ''); // This removes the leading numbers and dashes
    };

    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(prompt('Enter file name (optional) or press OK to use the original:', file.name) || file.name);
        setSelectedFile(file); // Store the selected file
    };

    const handleDeleteFolder = async (folder, e) => {
        e.stopPropagation(); // Prevent the folder from opening

        if (!window.confirm(`Delete folder "${folder.name}"?`)) return;

        // Determine the correct backend URL based on root or subfolder
        const deleteUrl = folder.parentFolderId
            ? `${backendUrl}/subFolders/${folder.parentFolderId}/${folder.uuid}` // Subfolder deletion URL
            : `${backendUrl}/folders/${uuid}/${folder.uuid}`; // Root-level folder deletion URL

        console.log("Attempting to delete folder with URL:", deleteUrl);

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });

            console.log("Response object:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error response:', errorText);
                throw new Error('Failed to delete folder');
            }

            // Update folder hierarchy without refetching
            const removeFolderFromHierarchy = (folders, folderId) => {
                return folders
                    .map(folder => ({
                        ...folder,
                        subfolders: removeFolderFromHierarchy(folder.subfolders || [], folderId),
                    }))
                    .filter(folder => folder.uuid !== folderId);
            };

            setFolders(prevFolders =>
                currentFolder && currentFolder.id !== 'root'
                    ? removeFolderFromHierarchy(prevFolders, folder.uuid)
                    : prevFolders.filter(f => f.uuid !== folder.uuid)
            );

            console.log(`Folder "${folder.name}" deleted successfully`);
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };






    const handleDeleteFile = async (file) => {
        if (!window.confirm(`Delete file "${file.name}"?`)) return;

        // Determine the delete URL based on whether the file is in the root folder or a specific folder
        let deleteUrl;
        if (currentFolder && currentFolder.id !== 'root') {
            // File is inside a specific folder or subfolder
            deleteUrl = `${backendUrl}/documents/${uuid}/${currentFolder.id}/${file.uuid}`;
        } else {
            // File is in the root folder
            deleteUrl = `${backendUrl}/documents/${uuid}/${file.uuid}`;
        }

        console.log("Deleting file at URL:", deleteUrl); // Log URL for verification

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error response:', errorText);
                throw new Error('Failed to delete file');
            }

            // Remove the file from the UI state
            setCurrentFolder(prevFolder => ({
                ...prevFolder,
                files: prevFolder.files.filter(f => f.uuid !== file.uuid),
            }));

            console.log(`File "${file.name}" deleted successfully`);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };


    const handleEdit = (item) => {
        const newName = prompt('Enter new name:', item.name);
        const newDescription = prompt('Enter new description:', item.description || '');

        if (newName || newDescription) {
            const updatedItem = { ...item, name: newName, description: newDescription };
            if (item.files) {
                updateFolderInHierarchy(item.id, updatedItem);
            } else {
                const updatedFiles = currentFolder.files.map((f) =>
                    f.id === item.id ? updatedItem : f
                );
                setCurrentFolder({ ...currentFolder, files: updatedFiles });
            }
        }
    };
    const toggleOptions = (e, id) => {
        e.stopPropagation(); // Prevent folder click
        setShowOptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };




    return (
        <div className={styles.inputDocumentSection}>
            {/* Header Section */}
            <div className={styles.inputDocumentHeader}>
                <div>
                        <button
                            className={styles.inputDocumentBackButton}
                            onClick={handleBackToParent}
                            disabled={!currentFolder}
                        >
                            <FaArrowLeft/> Back
                        </button>

                        <h2 className={styles.folderName}>
                            {currentFolder ? currentFolder.name : 'Documents'}
                        </h2>

                </div>

                <div className={styles.inputDocumentButtonsContainer}>
                    <button onClick={() => setFolderModalOpen(true)}>
                        <FaPlus/> Create Folder
                    </button>
                    <button onClick={() => setFileModalOpen(true)}>
                        <FaUpload/> Upload File
                    </button>
                </div>
            </div>

            {/* Folder Creation Modal */}
            {isFolderModalOpen && (
                <div className={styles.inputDocumentModal}>
                    <div className={styles.inputDocumentModalContent}>
                        <h2>Create Folder</h2>
                        <input
                            type="text"
                            placeholder="Folder Name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description (Optional)"
                            value={folderDescription}
                            onChange={(e) => setFolderDescription(e.target.value)}
                        />
                        <div className={styles.inputDocumentModalButtons}>
                            <button onClick={handleCreateFolder}>Create</button>
                            <button onClick={() => setFolderModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* File Upload Modal */}
            {isFileModalOpen && (
                <div className={styles.inputDocumentModal}>
                    <div className={styles.inputDocumentModalContent}>
                        <h2>Upload File</h2>
                        <input type="file" onChange={handleFileSelection}/>
                        <div className={styles.inputDocumentModalButtons}>
                            <button onClick={handleFileSubmit} disabled={!selectedFile}>Submit</button>
                            <button onClick={() => setFileModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render Content */}
           {/* Render Content */}
<div className={styles.inputDocumentCardsContainer}>
    {currentFolder ? (
        <>
            <p className={styles.folderDescription}>{currentFolder.description}</p>

            {/* Subfolders Section */}
            <div className={styles.subfoldersContainer}>
                {currentFolder.subfolders && currentFolder.subfolders.length > 0 ? (
                    currentFolder.subfolders.map((folder) => (
                        <div
                            key={folder.id}
                            className={styles.inputDocumentCard}
                            onClick={() => handleOpenFolder(folder)}
                        >
                            <MdFolder className={styles.inputDocumentCardIcon} />
                            <p className={styles.folderName}>{folder.name}</p>
                            <div className={styles.optionsMenu}>
                                <button
                                    className={styles.optionsButton}
                                    onClick={(e) => toggleOptions(e, folder.id)}
                                >
                                    <FaEllipsisV />
                                </button>
                                {showOptions[folder.id] && (
                                    <div className={styles.menu}>
                                        <button onClick={() => handleEdit(folder)}>Edit</button>
                                        <button onClick={(e) => handleDeleteFolder(folder, e)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No subfolders available.</p>
                )}
            </div>

            {/* Files Section */}
            <div className={styles.filesContainer}>
                {currentFolder.files && currentFolder.files.length > 0 ? (
                    currentFolder.files.map((file) => (
                        <div key={file.id} className={styles.inputFileCard}>
                            <FaRegFileAlt className={styles.inputFileCardIcon} />
                            <a
                                href={file.url}
                                download={file.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.fileName}
                            >
                                {file.name}
                            </a>
                            <div className={styles.optionsMenu}>
                                <button
                                    className={styles.optionsButton}
                                    onClick={(e) => toggleOptions(e, file.id)}
                                >
                                    <FaEllipsisV />
                                </button>
                                {showOptions[file.id] && (
                                    <div className={styles.menu}>
                                        <button onClick={() => handleEdit(file)}>Edit</button>
                                        <button onClick={() => handleDeleteFile(file)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No files available in this folder.</p>
                )}
            </div>
        </>
    ) : (
        <>
            {folders.length === 0 ? (
                <p>No folders or files available.</p>
            ) : (
                folders.map((folder) => (
                    <div
                        key={folder.id}
                        className={styles.inputDocumentCard}
                        onClick={() => handleOpenFolder(folder)}
                    >
                        <MdFolder className={styles.inputDocumentCardIcon} />
                        <h3>{folder.name}</h3>
                        {folder.description && <p>{folder.description}</p>}
                        <div className={styles.optionsMenu}>
                            <button
                                className={styles.optionsButton}
                                onClick={(e) => toggleOptions(e, folder.id)}
                            >
                                <FaEllipsisV />
                            </button>
                            {showOptions[folder.id] && (
                                <div className={styles.menu}>
                                    <button onClick={() => handleEdit(folder)}>Edit</button>
                                    <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </>
    )}
</div>

        </div>


    )
}


export default Documents;