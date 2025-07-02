/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Card,
  CardContent,
  Button,
  Divider,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const drawerWidth = 240;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdate = async (id, status) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/task/update-status`,
        { taskId: id, status },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    if (
      newTask.title.trim() &&
      newTask.description.trim() &&
      newTask.assignedTo
    ) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/task/create-task",
          {
            title: newTask.title,
            description: newTask.description,
            assignedTo: newTask.assignedTo,
          },
          { withCredentials: true }
        );

        const createdTask = res.data?.task;
        setTasks((prev) => [...prev, createdTask]);

        setNewTask({ title: "", description: "", assignedTo: "" });
        setOpenCreate(false);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/get-all-users"
      );
      setUsers(res.data?.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/task/get-tasks`,

        {
          withCredentials: true,
        }
      );
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function handleRole() {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/users/check-role",
          {},
          { withCredentials: true }
        );
        setRole(res.data.role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    }

    handleRole();
  }, []);

  useEffect(() => {
    fetchAllUsers();
    fetchAllTasks();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            My Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Task Cards */}
        <Box display="flex" flexWrap="wrap" gap={2}>
          {tasks.map((task) => (
            <Card key={task._id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                pb={2}
                gap={1}
              >
                <FormControl fullWidth size="small">
                  <InputLabel id={`status-label-${task._id}`}>
                    {task.status}
                  </InputLabel>
                  <Select
                    labelId={`status-label-${task._id}`}
                    id={`status-select-${task._id}`}
                    value={selectedValue}
                    label="Select Status"
                    onChange={handleChange}
                  >
                    <MenuItem
                      value={"To Do"}
                      onClick={() => handleUpdate(task._id, "To Do")}
                    >
                      To Do
                    </MenuItem>
                    <MenuItem
                      value={"In Progress"}
                      onClick={() => handleUpdate(task._id, "In Progress")}
                    >
                      In Progress
                    </MenuItem>
                    <MenuItem
                      value={"Done"}
                      onClick={() => handleUpdate(task._id, "Done")}
                    >
                      Done
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Create Task Button */}
        {role !== "user" && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpenCreate(true)}
            sx={{ position: "fixed", bottom: 30, right: 30 }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Create Task Dialog */}
        <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            {/* Assigned User Dropdown */}
            <TextField
              select
              label="Assign To"
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, assignedTo: e.target.value }))
              }
            >
              <MenuItem value=""></MenuItem>
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
