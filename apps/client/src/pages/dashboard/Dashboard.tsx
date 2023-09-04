// @ts-ignore
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "primereact/button";

import { routes } from "../../router/routes.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/use-auth/useAuth.ts";
import { useAppState } from "../../global-state/zustand.ts";
import { FilterMatchMode } from "primereact/api";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/apiClient.ts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import TaskDialog from "./task-dialog/TaskDialog.tsx";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const removeUser = useAppState((state) => state.removeUser);
  const logout = () => {
    removeUser();
    navigate(routes.login);
  };

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      description: { value: null, matchMode: FilterMatchMode.IN },
      priority: { value: null, matchMode: FilterMatchMode.EQUALS },
      done: { value: null, matchMode: FilterMatchMode.EQUALS },
    },
  });

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    // TODO optimize cachcing
    cacheTime: 0,
    queryKey: [
      "tasks",
      user!.id,
      ...Object.keys(lazyState.filters).map(
        // @ts-ignore
        (key) => lazyState.filters[key].value,
      ),
    ],
    queryFn: () =>
      api.tasks.getApiV1Tasks(
        10,
        lazyState.page * 10,
        "desc",
        lazyState.filters.title.value || undefined,
        undefined,
        lazyState.filters.done.value || undefined,
        lazyState.filters.priority.value || undefined,
      ),
  });

  // @ts-ignore
  const onPage = (page) => {
    // setOffset()
    setlazyState(page);
  };

  // @ts-ignore
  const onFilter = (e: any) => {
    setlazyState({ ...lazyState, ...e });
  };

  useEffect(() => {
    refetch();
  }, [lazyState]);

  const [statuses] = useState(["Low", "Medium", "High"]);

  // @ts-ignore
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        placeholder="Select Priorty"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  // @ts-ignore
  const doneRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={["Done", "Not Yet"]}
        onChange={(e) => {
          options.filterApplyCallback(
            e.value === "Done" ? true : e.value === "Not Yet" ? false : e.value,
          );
        }}
        placeholder="Select status"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  // @ts-ignore
  const actionsTemplate = (data): React.ReactNode => {
    return <Button label={"Edit"} onClick={() => setTaskId(data.id)} />;
  };

  const [taskId, setTaskId] = useState<string | undefined>(undefined);

  return (
    <>
      <TaskDialog taskId={taskId} onClose={() => setTaskId(undefined)} />
      <DashboardLayout>
        <Navigation>
          <div className={"header"}>
            <h3>Hello, {user!.username}</h3>
            <Button
              label={t("dashboard.createTask") as string}
              onClick={() => setTaskId("")}
            />
          </div>
          <Button
            severity={"danger"}
            label={t("dashboard.logout") as string}
            onClick={() => logout()}
          />
        </Navigation>
        <DashboardContent>
          <DataTable
            lazy
            first={lazyState.first}
            totalRecords={tasks?.count || 0}
            value={tasks?.items || []}
            paginator
            rows={10}
            dataKey="id"
            filters={lazyState.filters}
            filterDisplay="row"
            loading={isLoading}
            onFilter={onFilter}
            onPage={onPage}
            emptyMessage="No tasks found."
          >
            <Column
              field="title"
              header="Title"
              filter
              filterPlaceholder="Search by title"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="description"
              header="Description"
              style={{ minWidth: "12rem" }}
            />
            <Column
              filter
              field="priority"
              header="Priority"
              filterElement={statusRowFilterTemplate}
              style={{ minWidth: "12rem" }}
            />
            <Column
              filter
              field="done"
              filterElement={doneRowFilterTemplate}
              header="Done"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="id"
              header="Actions"
              style={{ minWidth: "12rem" }}
              body={actionsTemplate}
            />
          </DataTable>
        </DashboardContent>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

const DashboardLayout = styled.div`
  padding: 3rem;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  display: grid;
  height: 100%;
  width: 100%;
`;

const Navigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 3rem;

  .header {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: max-content max-content;
    grid-column-gap: 0.5rem;
    h3 {
      align-self: center;
    }
  }

  button {
    width: max-content;
    min-width: 6rem;
    align-self: center;

    &:last-child {
      justify-self: end;
    }
  }
`;

const DashboardContent = styled.div`
  height: 100%;
`;
