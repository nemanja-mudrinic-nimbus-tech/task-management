// @ts-ignore
import React, { FC, useEffect, useMemo } from "react";
import { ModalDialog } from "../../../components/modal/Modal.tsx";
import ControlledInput from "../../../components/form/controlled-input/ControlledInput.tsx";

import { taskFormFields, schema, FormData } from "./taskSchema.ts";
import ControlledDropdown from "../../../components/form/controlled-dropdown/ControlledDropdown.tsx";
import ControlledForm from "../../../components/form/controlled-form/controlled-form.tsx";
import styled from "styled-components";
import { Button } from "primereact/button";
import { useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/apiClient.ts";

type Props = {
  taskId: string | undefined;
  onClose: () => void;
};

const TaskForm: FC<{
  taskId: string | undefined;
  isCreateMode: boolean;
  onClose: () => void;
}> = ({ taskId, isCreateMode, onClose }) => {
  const {
    formState: { isValid },
    getValues,
    setValue,
  } = useFormContext();

  const mutationCreate = useMutation({
    mutationFn: (data: FormData) => {
      return api.tasks.postApiV1Tasks(data);
    },
    onSuccess: () => {
      onClose();
    },
  });

  const mutationEdit = useMutation({
    mutationFn: (data: FormData) => {
      return api.tasks.patchApiV1Tasks(taskId!, data);
    },
    onSuccess: () => {
      onClose();
    },
  });

  const { data: taskResponse } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => api.tasks.getApiV1Tasks1(taskId!),
    enabled: !!taskId,
  });

  useEffect(() => {
    if (!isCreateMode && taskId && taskResponse) {
      Object.keys(taskResponse).forEach((key) => {
        // @ts-ignore
        setValue(key, taskResponse[key]);
      });
    }
  }, [taskResponse, taskId]);

  return (
    <TaskFormContainer>
      <ControlledInput name={taskFormFields.title} label={"Title"} />
      <ControlledInput
        name={taskFormFields.description as string}
        label={"Description"}
      />
      <ControlledDropdown
        items={[
          { label: "Low", value: "Low" },
          { label: "Medium", value: "Medium" },
          { label: "High", value: "High" },
        ]}
        name={taskFormFields.priority as string}
        placeholder={"Priority"}
      />
      <ControlledDropdown
        items={[
          { label: "Not Yet", value: false },
          { label: "Done", value: true },
        ]}
        name={taskFormFields.done as string}
        placeholder={"Done"}
      />
      <div />
      <Button
        disabled={!isValid}
        loading={
          isCreateMode ? mutationCreate.isLoading : mutationEdit.isLoading
        }
        label={isCreateMode ? "Create" : "Save Changes"}
        onClick={() => {
          if (isCreateMode) {
            mutationCreate.mutate(getValues() as FormData);
          } else {
            mutationEdit.mutate(getValues() as FormData);
          }
        }}
      />
    </TaskFormContainer>
  );
};

const TaskDialog: FC<Props> = ({ taskId, onClose }) => {
  const isCreateMode = useMemo(() => taskId === "", [taskId]);

  return (
    <ModalDialog
      isOpen={taskId !== undefined}
      close={() => onClose()}
      heading={isCreateMode ? "Create task" : "Edit task"}
    >
      <ControlledForm
        defaultValues={{
          title: "",
          description: "",
          done: false,
          priority: "Low",
        }}
        schema={schema}
      >
        <TaskForm
          taskId={taskId}
          isCreateMode={isCreateMode}
          onClose={onClose}
        />
      </ControlledForm>
    </ModalDialog>
  );
};

const TaskFormContainer = styled.div`
  display: grid;
  padding: 1.5rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.75rem;
`;

export default TaskDialog;
