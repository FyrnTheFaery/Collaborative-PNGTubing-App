import { Dialog, DialogTrigger, /* GridListLoadMoreItem, */ Header, Heading, Key } from "react-aria-components"
import { GridList, GridListItem } from "../wrappers/GridList"
import Button from "../wrappers/Button"
import { Icon } from "@iconify/react"
import { ModelInfoProps } from "../models/ModelUtils"
import { useState } from "react"
import { Modal } from "../wrappers/Modal"
import Form from "../wrappers/Form"
import { TextField } from "../wrappers/Textfield"
import { FieldError } from "../wrappers/Field"
import { SelectWithTagGroup } from "../wrappers/Select"

// FIX_ME - Get the mouse models from the backend instead of relying on the frontend mockup
export const ModelPanel: React.FC<{}> = () => {

    let models: Array<ModelInfoProps> = []
    let [modelFilter, setModelFilter] = useState<ModelInfoProps["type"] | null>(null);
    let [selectedModelIDs, setSelectedModelIDs] = useState<Set<ModelInfoProps["id"]>>(new Set([]));
    let [canEdit, setCanEdit] = useState<boolean>(false);
    let [canDelete, setCanDelete] = useState<boolean>(false);
    let [canLaunch, setCanLaunch] = useState<boolean>(false);

    function handleFilterChange(newFilter: ModelInfoProps["type"] | null) {
        setModelFilter(newFilter);
    }

    function handleSelectionChange(newModelIDs: Selection) {
        // FIX_ME - Convert each selection to a modelID string
        let newIDs: Set<String> = new Set<String>(newModelIDs.toString());
        setSelectedModelIDs(newIDs);
    }

    function handleAddClick(name: ModelInfoProps["name"], type: ModelInfoProps["type"], src: ModelInfoProps["src"]) {
        // FIX_ME - create a new model file in the backend as soon as the user finishes filling out the form
        let modelInfo: ModelInfoProps = {
            id: name.toLowerCase(),
            type: type,
            name: name,
            src: src
        };
        models.push(modelInfo);
        // FIX_ME - Open an editor for the new model
    }

    function handleEditClick() {
        selectedModelIDs.forEach((modelID) => {
            // FIX_ME - For each selected model, open a new editor window for that model
        });
    }

    function handleDeleteClick() {
        // FIX_ME - Remove the models from the backend
        selectedModelIDs.forEach((modelID) => {
            for(let i = 0; i < models.length; i++) {
                if(models[i].id === modelID) {
                    models.splice(i, 0);
                    continue;
                }
                // FIX_ME - Throw an error if the model ID is not in the models
            }
        });
        if(models.length == 0) {
            setCanEdit(false);
            setCanDelete(false);
            setCanLaunch(false);
        }
    }

    return (
        <section className="flex flex-col w-full h-full gap-4 px-4 py-4">
            <Header className="flex flex-row w-full h-fit justify-between px-2">
                {/* <Select items={modelFilter}>
                    <SelectItem>All</SelectItem>
                    <SelectItem>Keyboard</SelectItem>
                    <SelectItem>Mouse</SelectItem>
                    <SelectItem>PNGTuber</SelectItem>
                </Select> */}
                <SelectWithTagGroup
                    aria-label="Model Filters"
                    tags={[
                        {id: "mouse", name: "Mouse"},
                        {id: "keyboard", name: "Keyboard"},
                        {id: "pngtuber", name: "PNGTuber"}
                    ]}
                />
                <Button variant="secondary"><Icon icon={"material-symbols:folder-open-outline-rounded"}/></Button>
            </Header>
            <GridList
                layout="stack"
                orientation="vertical"
                aria-label={"Model List"}
                selectionMode="multiple"
                selectedKeys={selectedModelIDs as Iterable<Key>}
                // onSelectionChange={(keys) => handleSelectionChange(keys)}
                className={"flex flex-col w-full h-{100}"}
            >
                <GridListItem>
                    {/* <Button slot="drag">
                        <Icon icon={"material-symbols:drag-indicator"}/>
                    </Button> */}
                    <h3>Item 1</h3>
                </GridListItem>
                <GridListItem>
                    <h3>Item 2</h3>
                </GridListItem>
                <GridListItem>
                    <h3>Item 3</h3>
                </GridListItem>
                {/* <GridListLoadMoreItem /> */}
            </GridList>
            <section className="flex flex-col w-full h-fit gap-8 align-start px-2">
                <div className="flex flex-row w-fit h-fit gap-4">
                    <DialogTrigger>
                        {/* Clicking this button automatically opens the modal dialog */}
                        <Button variant="secondary"><Icon icon="material-symbols:add-2-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <Form
                                        action={formData => {
                                            let modelName = formData.get('name') as String
                                            let modelType = formData.get('type') as ModelInfoProps["type"]
                                            let thumbnail = formData.get('thumbnail') as String
                                            handleAddClick(modelName, modelType, thumbnail)
                                        }}
                                        className="m-4"
                                    >
                                        <Heading slot="title">Create Model</Heading>
                                        <TextField isRequired name="name" label="Name" type="text" placeholder="Enter your model's name">
                                            <FieldError />
                                        </TextField>
                                        <TextField isRequired name="thumbnail" label="Model Thumbnail" type="text" placeholder="Enter your model's thumbnail">
                                            <FieldError />
                                        </TextField>
                                        <div className="flex flex-row w-full justify-end gap-4">
                                            <Button variant="secondary" onPress={close}>Cancel</Button>
                                            <Button type="submit">Create Model</Button>
                                        </div>
                                    </Form>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {
                        selectedModelIDs.size > 1 ? 
                        <DialogTrigger>
                            {/* Clicking this button automatically opens the modal dialog */}
                            <Button variant="secondary" isDisabled={!canEdit}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                            
                            <Modal>
                                <Dialog>
                                    {({ close }) => (
                                        <>
                                            <Heading slot="title">Edit Models</Heading>
                                            <p>Are you sure you want to edit multiple models at once?</p>
                                            
                                            {/* Pressing this button automatically closes it */}
                                            <Button variant="secondary" onPress={close}>Cancel</Button>
                                            <Button variant="primary" isDisabled={canEdit} onClick={() => handleEditClick()}>Edit Models</Button>
                                        </>
                                    )}
                                </Dialog>
                            </Modal>
                        </DialogTrigger>
                        : <Button variant="secondary" isDisabled={!canEdit} onClick={() => handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                    }
                    <DialogTrigger>
                        {/* Clicking this button automatically opens the modal dialog */}
                        <Button variant="destructive" isDisabled={!canDelete}><Icon icon="material-symbols:delete-outline-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <Form
                                        action={() => {
                                            handleDeleteClick()
                                        }}
                                        className="m-4"
                                    >
                                        <Heading slot="title">Delete Model</Heading>
                                        <div className="flex flex-col">
                                            <p>Are you sure you want to delete these models?</p>
                                            <p className="text-rose-400">This action cannot be undone.</p>
                                        </div>
                                        <div className="flex flex-row w-full justify-end gap-4">
                                            <Button variant="secondary" onPress={close}>Cancel</Button>
                                            <Button variant="destructive" type="submit">Delete Model</Button>
                                        </div>
                                    </Form>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {/* <Button className="h-full min-h-fit" onClick={()=>handleAddClick()}><Icon icon="material-symbols:add-2-rounded"/></Button> */}
                    {/* <Button isDisabled={canEdit} onClick={()=> handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button> */}
                    {/* <Button isDisabled={canDelete} onClick={()=>handleDeleteClick()}><Icon icon="material-symbols:delete-outline-rounded"/></Button> */}
                </div>
                <Button variant="primary" isDisabled={!canLaunch} className={"w-full"}>Launch Models</Button>
            </section>
        </section>
    )
}