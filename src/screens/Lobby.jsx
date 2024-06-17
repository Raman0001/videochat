import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        // console.log(email,room);
        navigate(`/room/${room}`);
    }, [navigate])

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        }
    }, [socket,handleJoinRoom]);

    return (
        <>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email Id</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="room">Room Id</label>
                <input type="text" id="room" value={room} onChange={e => setRoom(e.target.value)} />
                <button>join</button>
            </form>
        </>
    );
};
export default LobbyScreen;