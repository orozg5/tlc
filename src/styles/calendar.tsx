import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-primary {
    background: #f1c93b;
    color: #040d12;
    box-shadow: none;
    &:hover {
      background: #fae392;
    }
    &:focus {
      background: #fae392;
      color: #040d12;
    }
  }
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background: #fae392;
    color: #040d12;
    box-shadow: none;
  }
  .fc-day-today {
    background: #5c8374 !important;
  }
  .fc-theme-standard td,
  .fc-theme-standard th,
  .fc-theme-standard .fc-scrollgrid {
    border-color: #040d12;
  }
  .fc-timegrid-event .fc-event-main {
    padding: 2px;
  }
  .fc-v-event .fc-event-main {
    color: #eeeeee;
    background: #183d3d;
  }
  .fc-event-main > b {
    font-weight: lighter;
  }
  .fc-theme-standard .fc-list-day-cushion {
    background-color: #5c8374;
  }
  .fc-theme-standard .fc-list {
    border: 1px solid #040d12;
  }
  .fc-list-event-dot {
    display: none;
  }
  padding: 16px;
  background: #93b1a6;
  border-radius: 16px;
  color: #040d12;
`;
