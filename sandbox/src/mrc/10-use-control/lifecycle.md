```tsx
function Child() {
  useEffect(() => {
    console.log("child mount");
    return () => void console.log("child unmount");
  }, []);
  useLayoutEffect(() => {
    console.log("useLayoutEffect child mount");
    return () => void console.log("useLayoutEffect child unmount");
  }, []);
  return <div>child</div>;
}

function Parent() {
  useEffect(() => {
    console.log("Parent mount");
    return () => void console.log("Parent unmount");
  }, []);
  useLayoutEffect(() => {
    console.log("useLayoutEffect Parent mount");
    return () => void console.log("useLayoutEffect Parent unmount");
  }, []);

  return (
    <div>
      <Child />
    </div>
  );
}

```