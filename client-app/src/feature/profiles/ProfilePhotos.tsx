import React, { useContext, useState } from 'react'
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidget from '../../app/common/photoUpload/photoUploadWidget';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, photoUploading, uploadPhoto, setMain, photoLoading } = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content="Photos"/>
                    {isCurrentUser &&
                        <Button floated='right' onClick={() => setAddPhotoMode(!addPhotoMode)} basic content={addPhotoMode ? 'Cancel' : 'Add Photo'} />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode
                        ?
                        (<PhotoUploadWidget uploadPhoto={handleUploadImage} loading={photoUploading}/>)
                        :
                        (<Card.Group itemsPerRow={5}>
                             {profile && profile.photos.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                     {isCurrentUser && <Button.Group fluid widths={2}>
                                         <Button positive content="Main" onClick={() => setMain(photo)} loading={photoLoading}/>
                                         <Button negative icon="trash" />
                                         </Button.Group>}
                                </Card>
                            ))}
                         </Card.Group>)
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
}

export default observer(ProfilePhotos)